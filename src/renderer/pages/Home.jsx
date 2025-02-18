import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import NewTree from "../components/NewTree";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [trees, setTrees] = useState([]);

  const handleClickTree = (treeId) => {
    console.log(treeId);
    navigate(`/tree-view/${treeId}`);
  };

  useEffect(() => {
    const fetchTrees = async () => {
      try {
        const response = await window.treeAPI.getSavedTrees();
        console.log(response);
        setTrees(response);
      } catch (error) {
        console.error("Erro ao buscar as árvores salvas:", error);
      }
    };

    fetchTrees();
  }, []);

  return (
    <div className="flex flex-row bg-background-green-100 min-h-screen">
      <div className="w-1/6 h-screen">
        <Sidebar />
      </div>
      <div className="flex flex-col w-5/6">
        <NewTree />
        <div className="flex flex-col h-full items-center overflow-y-auto">
          {trees.map((tree, key) => {
            return (
              <div className="w-[80%] relative" key={key}>
                <button
                  className="absolute bottom-5 right-5 bg-background-green-400 bg-opacity-80 rounded-lg p-3 z-50"
                  onClick={(event) => {
                    
                    console.log("Exportando...");
                  }}
                >
                  <p className="text-sm text-black font-semibold">
                    Export Data
                  </p>
                </button>
                <div
                  className="h-full hover:backdrop-brightness-150 ease-in duration-150 rounded-lg p-4 mb-6 cursor-pointer"
                  onClick={() => {
                    handleClickTree(tree.id);
                  }}
                >
                  <div className="flex flex-row justify-between mb-2">
                    <p className="text-white font-semibold text-base capitalize">
                      {tree.name}
                    </p>
                    <p className="text-white font-semibold text-sm capitalize">
                      Last modified: 3 days
                    </p>
                  </div>
                  <div className="flex flex-row justify-between mb-2">
                    <div className="flex flex-col justify-start items-start px-3">
                      <p className="text-white font-semibold text-xs capitalize my-2">
                        Dictionary: {tree.dictionary.length} elements
                      </p>
                      <p className="text-white font-semibold text-xs capitalize">
                        Nodes: {tree.nodes.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
