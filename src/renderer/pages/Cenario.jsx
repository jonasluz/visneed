import React, { useEffect, useState } from "react";
import Dock from "../components/Dock";
import { useNavigate, useParams } from "react-router-dom";
import { Collapse } from "react-collapse";

import addIcon from "../../assets/add-symbol.png";

// Notifications
import { ToastContainer, toast } from "react-toastify";

// Modals
import GoToHomeModal from "../components/treePageComponents/Modals/GoToHomeModal";
import NewCenariModal from "../components/cenarioPageComponents/Modals/NewCenarioModal";
import NewElementModal from "../components/cenarioPageComponents/Modals/NewElementModal";

function Cenario() {
  const navigate = useNavigate();
  const { treeId, treeName } = useParams();

  const [dictionary, setDictionary] = useState([]);
  const [cenarios, setCenarios] = useState([]);
  const [update, setUpdate] = useState(false);

  const [showHomeModal, setShowHomeModal] = useState(false);
  const [addCenarioModal, setAddCenarioModal] = useState(false);
  const [addNewElemModal, setNewElemModal] = useState(false);

  const [expandedItems, setExpandedItems] = useState({});
  const [cenarioElements, setCenarioElements] = useState({});
  const [currentCenarioId, setCurrentCenarioId] = useState(null);
  const [currentParentId, setCurrentParentId] = useState(null);

  useEffect(() => {
    async function loadStoredJson() {
      const response = await window.treeAPI.loadTree(treeId);
      const cenariosResponse = await window.cenarioAPI.getSavedCenarios();

      const cenariosFiltrados = cenariosResponse.filter(
        (c) => String(c.treeId) === String(treeId)
      );

      setCenarios(cenariosFiltrados);

      // Carrega os elementos de cada cenário
      const elementsMap = {};
      for (const cenario of cenariosFiltrados) {
        if (cenario.cenario && cenario.cenario.elements) {
          elementsMap[cenario.id] = cenario.cenario.elements;
        }
      }
      setCenarioElements(elementsMap);

      if (response) {
        setDictionary(response.dictionary);
      }
    }
    loadStoredJson();
  }, [update]);

  const handleUpdate = () => {
    setUpdate(!update);
  };

  const handleConfirmGoHome = () => {
    setShowHomeModal(false);
    navigate("/");
  };

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddElement = (cenarioId, parentId = null) => {
    setCurrentCenarioId(cenarioId);
    setCurrentParentId(parentId);
    setNewElemModal(true);
  };

  const saveCenarioElements = async (cenarioId, elements) => {
    try {
      await window.cenarioAPI.saveCenario(cenarioId, { 
        cenario: { elements } 
      });
      toast.success("Saved with success!");
    } catch (error) {
      toast.error("Error");
      console.error("Erro:", error);
    }
  };

  const handleSaveElement = async (elementData) => {
    if (!currentCenarioId) return;
  
    const newElement = {
      id: Date.now(),
      key: elementData.key,
      value: elementData.value,
      children: []
    };
  
    // Primeiro atualizamos o estado local
    const updatedElements = { ...cenarioElements };
  
    if (!currentParentId) {
      // Adiciona no nível superior
      updatedElements[currentCenarioId] = [
        ...(updatedElements[currentCenarioId] || []),
        newElement
      ];
    } else {
      // Adiciona como filho
      const addChildToParent = (elements) => {
        return elements.map(element => {
          if (element.id === currentParentId) {
            return {
              ...element,
              children: [...element.children, newElement]
            };
          }
          if (element.children && element.children.length > 0) {
            return {
              ...element,
              children: addChildToParent(element.children)
            };
          }
          return element;
        });
      };
  
      updatedElements[currentCenarioId] = addChildToParent(
        updatedElements[currentCenarioId] || []
      );
    }
  
    // Atualiza o estado
    setCenarioElements(updatedElements);
  
    // Salva os elementos do cenário, incluindo os aninhados
    await saveCenarioElements(currentCenarioId, updatedElements[currentCenarioId] || []);
  
    setNewElemModal(false);
    setCurrentCenarioId(null);
    setCurrentParentId(null);
  };

  const renderElements = (elements, cenarioId, depth = 0) => {
    return elements.map((element) => (
      <div key={element.id} className={`ml-${depth * 4} mb-2 p-2 border-l-2 border-background-green-400 pl-4`}>
        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">
              {element.key}: <span className="text-gray-600">{String(element.value)}</span>
            </p>
          </div>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleAddElement(cenarioId, element.id);
            }}
            className="ml-2 p-1 rounded hover:bg-background-green-200"
          >
            <img src={addIcon} alt="Add" className="w-4 h-4" />
          </button>
        </div>
        {element.children && element.children.length > 0 && (
          <div className="mt-2">
            {renderElements(element.children, cenarioId, depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <>
      {showHomeModal && (
        <GoToHomeModal
          onConfirm={handleConfirmGoHome}
          onCancel={() => setShowHomeModal(false)}
        />
      )}

      <ToastContainer />

      <Dock
        currentPage={"cenario"}
        treeId={treeId}
        treeName={treeName}
        onHomeClick={() => setShowHomeModal(true)}
      />

      <NewCenariModal
        isOpen={addCenarioModal}
        onClose={() => setAddCenarioModal(false)}
        dictionary={dictionary}
        onUpdate={handleUpdate}
        treeId={treeId}
      />

      <NewElementModal
        isOpen={addNewElemModal}
        onClose={() => {
          setNewElemModal(false);
          setCurrentCenarioId(null);
          setCurrentParentId(null);
        }}
        dictionary={dictionary}
        onSave={handleSaveElement}
      />

      <div className="flex h-full w-full justify-center items-end bg-background-green-100">
        <div className="flex flex-col w-[80%] h-[90%] justify-between">
          <button
            className="self-start bg-background-green-400 p-5 rounded-lg font-rubik-semibold font-semibold text-lg"
            onClick={() => setAddCenarioModal(true)}
          >
            Create new cenario
          </button>

          <div className="flex flex-col h-[90%] p-4 w-full overflow-auto">
            {cenarios.length == 0 && 
              <div className="flex justify-center items-center h-full w-full">
                <p className="font-semibold text-white text-lg">No cenarios created yet</p>
              </div>
            }
            {cenarios.length > 0 &&
              cenarios.map((cenario) => {
                const isExpanded = expandedItems[cenario.id] || false;
                const elements = cenarioElements[cenario.id] || [];

                return (
                  <div key={cenario.id} className="flex flex-col w-full mb-4">
                    <div className="flex flex-row justify-between items-center w-full p-6 bg-background-green-500 rounded-lg">
                      <div
                        className="flex flex-col cursor-pointer w-full"
                        onClick={() => toggleExpand(cenario.id)}
                      >
                        <div className="flex flex-row gap-2 items-center">
                          <h1 className="font-rubik-semibold font-semibold text-lg">
                            {cenario.name}
                          </h1>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddElement(cenario.id);
                          }}
                        >
                          <img
                            src={addIcon}
                            alt="Adicionar"
                            className="w-5 h-5 object-contain"
                          />
                        </button>
                      </div>
                    </div>

                    <Collapse isOpened={isExpanded}>
                      <div className="ml-10 mt-2 p-4 bg-background-green-300 rounded-lg">
                        {elements.length === 0 ? (
                          <p className="text-sm italic text-gray-700">
                            Nenhum elemento adicionado ainda.
                          </p>
                        ) : (
                          renderElements(elements, cenario.id)
                        )}
                      </div>
                    </Collapse>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cenario;