import React, { useEffect, useState } from "react";
import Dock from "../components/Dock";
import { useNavigate, useParams } from "react-router-dom";

import searchIcon from "../../assets/search.png";

//Notifications
import { ToastContainer, toast } from "react-toastify";

import GoToHomeModal from "../components/treePageComponents/Modals/GoToHomeModal";

function Cenario() {
  const navigate = useNavigate();
  const { treeId, treeName } = useParams();

  const [data, setData] = useState();
  const [dictionary, setDictionary] = useState([]);
  const [searchKey, setSearchKey] = useState("");

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
      Ainda desenvolvendo
      <div className="flex h-full w-full justify-center items-end bg-background-green-100">
        <div className="flex flex-col w-[60%] h-[80%] justify-between">
          <div className="flex flex-row w-full h-[10%] justify-between">
            {/* Search Input */}
            <div className="flex flex-row w-full items-center justify-around rounded-lg bg-background-green-300">
              <img
                src={searchIcon}
                alt=""
                className="w-8 h-8 object-cover ml-4"
                draggable={false}
              />
              <input
                type="text"
                value={searchKey}
                placeholder="Search Cenario"
                className="text-xl font-bold text-black bg-transparent w-full h-full p-4 outline-none"
                onChange={(e) => {
                  setSearchKey(e.target.value);
                }}
              />
            </div>
          </div>
          <button className="self-start bg-background-green-400 p-5 my-5 rounded-lg font-rubik-semibold font-semibold text-lg">
            Create new cenario
          </button>

          <div className="flex flex-row h-[80%]">
            <div className="w-full overflow-y-auto scrollbar-none rounded-t-lg border border-background-white-100 border-opacity-50">
              <table className="w-full relative">
                <thead className="uppercase rounded-t-lg bg-background-green-200 sticky top-0 z-20 w-full">
                  <tr className="w-full">
                    <th className="py-2 w-[45%] h-full">Key</th>
                    <th className="py-2 w-[45%] h-full">Value</th>
                  </tr>
                </thead>
                <tbody className="text-center w-full">
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cenario;
