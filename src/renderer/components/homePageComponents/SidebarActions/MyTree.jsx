import React from "react";
import NewTree from "../SidebarActions/NewTree";
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

function MyTree({ trees }) {
  const navigate = useNavigate();

  const handleClickTree = (treeId) => {
    navigate(`/tree-view/${treeId}`);
  };

  const handleExport = async (treeId, treeName) => {
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

  return (
    <div className="h-full">
      <p className="text-2xl font-semibold text-white font-rubik-semibold self-start p-5 mx-10">
        My trees:
      </p>
      <div className="flex flex-col h-[91%] items-center overflow-y-auto scrollbar-none">
        {trees.map((tree, key) => {
          return (
            <div className="w-[80%] border relative mb-5 bg-background-green-200 rounded-lg shadow-lg" key={key}>
              <button
                className="absolute bottom-5 right-5 hover:backdrop-brightness-200 bg-background-green-400 bg-opacity-80 rounded-lg p-3 z-50"
                onClick={() => {
                  handleExport(tree.id, tree.name);
                }}
              >
                <p className="text-md text-black font-semibold">Export Data</p>
              </button>
              <div
                className="h-full hover:backdrop-brightness-150 ease-in duration-150 rounded-lg p-4 cursor-pointer"
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
  );
}

export default MyTree;
