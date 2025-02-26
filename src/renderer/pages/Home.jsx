import React, { useEffect, useState } from "react";
import Sidebar from "../components/homePageComponents/Sidebar";
import NewTree from "../components/homePageComponents/NewTree";
import { useNavigate } from "react-router-dom";

const formatTimeAgo = (timestamp) => {
  if (!timestamp) return "Unknown";
  
  const lastModifiedDate = new Date(timestamp);
  // console.log(lastModifiedDate)
  const now = new Date();
  const diffInSeconds = Math.floor((now - lastModifiedDate) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} days ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} months ago`;

  return `${Math.floor(diffInMonths / 12)} years ago`;
};

function Home() {
  const navigate = useNavigate();

  const [trees, setTrees] = useState([]);

  const handleClickTree = (treeId) => {
    // console.log(treeId);
    navigate(`/tree-view/${treeId}`);
  };

  useEffect(() => {
    const fetchTrees = async () => {
      try {
        const response = await window.treeAPI.getSavedTrees();
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
      <div className="flex flex-col w-5/6 h-screen">
        <NewTree />
        <p className="w-full self-center h-px my-4 bg-gradient-to-r from-[#2F3E46] from-5% via-[#CAD2C5] via-50% to-[#2F3E46] to-95%"></p>
        <p className="text-white font-semibold text-2xl self-start p-5 mx-10">My trees:</p>
        <div className="flex flex-col h-full items-center overflow-y-auto">
          {trees.map((tree, key) => {
            return (
              <div className="w-[80%] relative mb-5" key={key}>
                <button
                  className="absolute bottom-5 right-5 hover:backdrop-brightness-200 bg-background-green-400 bg-opacity-80 rounded-lg p-3 z-50"
                  onClick={(event) => {
                    
                    console.log("Exportando...");
                  }}
                >
                  <p className="text-lg text-black font-semibold">
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
                    <p className="text-white font-semibold text-xl capitalize">
                      {tree.name}
                    </p>
                    <p className="text-white font-semibold text-xl capitalize">
                      Last modified: {formatTimeAgo(tree.lastModified)}
                    </p>
                  </div>
                  {/* {console.log(tree)} */}
                  <div className="flex flex-row justify-between mb-2">
                    <div className="flex flex-col justify-start items-start px-3">
                      <p className="text-white font-semibold text-md capitalize my-2">
                        Dictionary: {tree.dictionary.length} elements
                      </p>
                      <p className="text-white font-semibold text-md capitalize">
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
