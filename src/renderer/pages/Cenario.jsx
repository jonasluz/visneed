import React, { useEffect, useState } from "react";
import Dock from "../components/Dock";
import { useNavigate, useParams } from "react-router-dom";

//Notifications
import { ToastContainer, toast } from "react-toastify";

import GoToHomeModal from "../components/treePageComponents/Modals/GoToHomeModal";

function Cenario() {
  const navigate = useNavigate();
  const { treeId, treeName } = useParams();

  const [data, setData] = useState();
  const [dictionary, setDictionary] = useState([]);

  const [update, setUpdate] = useState(false);

  const [showHomeModal, setShowHomeModal] = useState(false);

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
          onHomeClick={() => setShowHomeModal(true)} />

      <div className="relative h-full w-full bg-background-green-100">
        
        Cenario
      </div>
    </>

   

    
  );
}

export default Cenario;
