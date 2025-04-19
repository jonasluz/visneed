import React, { useEffect, useState } from "react";
import Dock from "../components/Dock";
import { useNavigate, useParams } from "react-router-dom";

import searchIcon from "../../assets/search.png";

//Notifications
import { ToastContainer, toast } from "react-toastify";

import GoToHomeModal from "../components/treePageComponents/Modals/GoToHomeModal";
import NewCenariModal from "../components/cenarioPageComponents/Modals/NewCenarioModal";

function Cenario() {
  const navigate = useNavigate();
  const { treeId, treeName } = useParams();

  const [data, setData] = useState();
  const [dictionary, setDictionary] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const [update, setUpdate] = useState(false);

  const [showHomeModal, setShowHomeModal] = useState(false);
  const [addCenarioModal, setAddCenarioModal] = useState(false)

  useEffect(() => {
      async function loadStoredJson() {
        const response = await window.treeAPI.loadTree(treeId);
        console.log("Get response:", response);
        if (response) {
          setData(transformTreeData(response))
          setDictionary(response.dictionary);
        }
      }
      loadStoredJson();

    }, [update]);

  const handleConfirmGoHome = () => {
    setShowHomeModal(false);
    navigate("/");
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

  return (
    <>
      {showHomeModal && (
        <GoToHomeModal
          onConfirm={handleConfirmGoHome}
          onCancel={() => setShowHomeModal(false)}
        />
      )}

      <ToastContainer />

      <Dock currentPage={"cenario"}
          treeId={treeId}
          treeName={treeName}
          onHomeClick={() => setShowHomeModal(true)}
      />
      {console.log(dictionary)}

      <NewCenariModal
        isOpen={addCenarioModal}
        onClose={() => {setAddCenarioModal(false)}}
        dictionary={dictionary}
      />
      <div className="flex h-full w-full justify-center items-end bg-background-green-100">
        <div className="flex flex-col w-[80%] h-[90%] justify-between">
          <button className="self-start bg-background-green-400 p-5 rounded-lg font-rubik-semibold font-semibold text-lg" onClick={() => {setAddCenarioModal(true)}}>
            Create new cenario
          </button>

          <div className="flex flex-row h-[90%] border">

          </div>
        </div>
      </div>
    </>
  );
}

export default Cenario;
