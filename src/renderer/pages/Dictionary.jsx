import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//Notifications
import { ToastContainer, toast } from "react-toastify";

import Dock from "../components/Dock";

import exportIcon from "../../assets/export.png";
import deleteIcon from "../../assets/delete.png";
import searchIcon from "../../assets/search.png";
import addIcon from "../../assets/add-symbol.png";
import GoToHomeModal from "../components/treePageComponents/Modals/GoToHomeModal";
import AddNodeModal from "../components/treePageComponents/Modals/AddNodeModal";

function Dictionary() {
  const navigate = useNavigate();

  const [data, setData] = useState();
  const [update, setUpdate] = useState(false);

  const { treeId, treeName } = useParams();
  const [dictionary, setDictionary] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const [showHomeModal, setShowHomeModal] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    async function loadStoredJson() {
      const response = await window.treeAPI.loadTree(treeId);
      console.log("Get response:", response);
      if (response) {
        setData(transformTreeData(response))
        console.log(transformTreeData(response))
        setDictionary(response.dictionary);
      }
    }
    loadStoredJson();
  }, [update]);

  const handleConfirmGoHome = () => {
    setShowHomeModal(false);
    navigate("/");
  };

  const handleExport = async () => {
    try {
      const exportData = await window.treeAPI.exportTree(treeId);

      if (exportData) {
        // Converte o objeto para uma string JSON
        const dataStr = JSON.stringify(exportData, null, 2);

        // Cria um Blob com o conteúdo JSON
        const dataBlob = new Blob([dataStr], { type: "application/json" });

        // Cria um link para download
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${treeName}.json`; // Nome do arquivo
        link.click();

        URL.revokeObjectURL(url);
      } else {
        console.log("Error: Tree not found.");
      }
    } catch (error) {
      console.error("Erro ao exportar a árvore:", error);
    }
  };

  function transformTreeData(data) {
    const projectName = data.name 

    const dictionary = data.dictionary
    
    const nodesArray = data.nodes.map((node) => ({
      id: node.id,
      name: node.name,
      connections: node.connections,
      outcomes: Array.isArray(node.outcomes) && node.outcomes.length > 0 ? node.outcomes : "No outcome"
    }));
  
    const edgesArray = [];
    data.nodes.forEach((node) => {
      node.connections.forEach((conn) => {
        edgesArray.push({
          from: node.id,
          to: conn.targetId,
          predicate: conn.gate.predicates[0]? conn.gate.predicates[0] : "No predicate",
          actions: conn.gate?.actions?.[0] || "No action"
        });
      });
    });
    return { nodesArray, edgesArray, projectName, dictionary };
  }

  const handleAddNode = (
    parentNodeId,
    newNodeName,
    predicateInfo,
    outcomeInfo,
    actionInfo
  ) => {
    if (!parentNodeId) {
      toast.success(`New tree created with root ${newNodeName}`);
    } else {
      toast.success(`Nó ${newNodeName}, criado com sucesso!`);
    }

    const lastNodeOnArray = data.nodesArray[data.nodesArray.length - 1];
    const newNodeId = lastNodeOnArray ? lastNodeOnArray.id  + 1 : 1;

    const newNode = {
      id: newNodeId,
      name: newNodeName,
      connections: [],
      outcomes:
        outcomeInfo.key == ""
          ? ["No outcome"]
          : [
              {
                key: outcomeInfo.key,
                operator: outcomeInfo.operator,
                value: outcomeInfo.value,
              },
            ],
    };

    // Criar a nova conexão para o nó pai
    const newConnection = {
      name: `${parentNodeId}-${newNodeId}`, // Nome da conexão (ex: "1-2")
      targetId: newNodeId,
      gate: {
        predicates:
          predicateInfo.key == ""
            ? ["No predicate"]
            : [
                {
                  key: predicateInfo.key,
                  condition: predicateInfo.condition,
                  value: predicateInfo.value,
                  logicalOperator: predicateInfo.logicalOperator,
                },
              ],
        actions:
          actionInfo.key == ""
            ? ["No action"]
            : [
                {
                  key: actionInfo.key,
                  operator: actionInfo.operator,
                  value: actionInfo.value,
                },
              ],
      },
    };

    const updatedNodesArray = data.nodesArray.map((node) => {
      if (node.id === parseInt(parentNodeId)) {
        return {
          ...node,
          connections: [...node.connections, newConnection], // Adiciona a nova conexão
        };
      }
      return node;
    });

    updatedNodesArray.push(newNode);

    const newEdge = {
      from: parseInt(parentNodeId),
      to: newNodeId,
      predicate:
        predicateInfo.key == "" ? ["No predicate"] : [
              {
                key: predicateInfo.key,
                condition: predicateInfo.condition,
                value: predicateInfo.value,
                logicalOperator: predicateInfo.logicalOperator,
              },
            ],
      actions:
        actionInfo.key == "" ? ["No action"] : [
              {
                key: actionInfo.key,
                operator: actionInfo.operator,
                value: actionInfo.value,
              },
            ],
    };

    const updatedEdgesArray = [...data.edgesArray, newEdge];
    const updatedDictionary = [
      ...data.dictionary,
      { key: newNodeName, type: "string" },
      ...(outcomeInfo.key ? [{ key: outcomeInfo.key, type: outcomeInfo.type }] : []),
      ...(predicateInfo.key ? [{ key: predicateInfo.key, type: predicateInfo.type }] : []),
      ...(actionInfo.key ? [{ key: actionInfo.key, type: actionInfo.type }] : []),
    ];

    setData({
      nodesArray: updatedNodesArray,
      edgesArray: updatedEdgesArray,
      dictionary: updatedDictionary,
    });

    // update json with new node
    const updatedData = {
      nodes: updatedNodesArray.map((node) => ({
        ...node,
        name: node.name,
      })),
      edges: updatedEdgesArray,
      dictionary: updatedDictionary,
    };

    window.treeAPI.saveTree(treeId, updatedData);
    setUpdate(true);
  };

  return (
    <>
      {/* Notification component */}
      <ToastContainer />
    
      {showHomeModal && (
        <GoToHomeModal
          onConfirm={handleConfirmGoHome}
          onCancel={() => setShowHomeModal(false)}
        />
      )}
      
      {data && (
        <AddNodeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onConfirm={handleAddNode}
        nodes={data.nodesArray}/>
      )}

      <Dock currentPage={"dictionary"} treeId={treeId} treeName={treeName} onHomeClick={() => setShowHomeModal(true)}/>
      <div className="flex h-full w-full justify-center items-end bg-background-green-100">
        <div className="flex flex-col w-[60%] h-[80%] justify-between">
          <div className="flex flex-row w-full h-[12%] justify-between">
            <div className="flex flex-row w-[90%] items-center justify-around rounded-lg bg-background-green-300">
              <img
                src={searchIcon}
                alt=""
                className="w-8 h-8 object-cover ml-4"
                draggable={false}
              />
              <input
                type="text"
                value={searchKey}
                placeholder="Search Key"
                className="text-xl font-bold text-black bg-transparent w-[80%] h-full p-4"
                onChange={(e) => {
                  setSearchKey(e.target.value);
                }}
              />
              <div className="flex justify-center items-center bg-background-green-400 hover:brightness-50 duration-100 ease-in-out h-10 w-10 rounded-full cursor-pointer" 
              onClick={() => {setIsAddModalOpen(true)}}>
                <img
                  src={addIcon}
                  alt=""
                  className="w-8 h-8 object-cover p-2"
                  draggable={false}
                />
              </div>
            </div>

            <button
              className="bg-background-green-400 hover:brightness-50 duration-100 ease-in-out w-[8%] rounded-lg p-6"
              onClick={handleExport}
            >
              <img src={exportIcon} alt="" draggable={false} />
            </button>
          </div>

          <div className="flex flex-row h-[80%]">
            <div className="w-full overflow-y-auto scrollbar-none rounded-t-lg border border-background-white-100 border-opacity-50">
              <table className="w-full relative">
                <thead className="uppercase rounded-t-lg bg-background-green-200 sticky top-0 z-20 w-full">
                  <tr className="w-full">
                    <th className="py-2 w-[45%] h-full">Key</th>
                    <th className="py-2 w-[45%] h-full">Type</th>
                    <th className="py-2 w-[10%] h-full"></th>
                  </tr>
                </thead>
                <tbody className="text-center w-full">
                  {dictionary
                    .filter(
                      (item) => searchKey === "" || item.key.includes(searchKey)
                    ) // Filtra apenas os itens que contêm a chave pesquisada
                    .map((item, index) => (
                      <tr
                        key={index}
                        className="font-bold w-full bg-background-green-500 hover:bg-background-green-400 hover:text-white cursor-pointer"
                      >
                        <td className="py-4 w-[45%]">{item.key}</td>
                        <td className="py-4 w-[45%]">{item.type}</td>
                        <td className="bg-red-900 hover:brightness-125 w-[10%] z-0">
                          <img
                            src={deleteIcon}
                            alt=""
                            className="w-6 justify-self-center"
                            draggable={false}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dictionary;
