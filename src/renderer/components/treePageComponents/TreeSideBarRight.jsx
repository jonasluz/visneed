import React from "react";
import Outcomes from "./sidebarRightComponents/Outcomes";
import Predicates from "./sidebarRightComponents/Predicates";
import Actions from "./sidebarRightComponents/Actions";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TreeSideBarRight({ selectedOutcome, selectedEdge, nodes, treeId, treeName}) {

  // Export the tree made as a json file
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
        toast.success("Tree converted into a JSON with success!");
      } else {
        toast.error("Error: Tree not found.");
      }
    } catch (error) {
      console.error("Erro ao exportar a árvore:", error);
    }
  };

  return (
    <>
      <div className="h-[10%] flex justify-center bg-background-green-200 hover:brightness-150 duration-100 ease-in-out bg-opacity-80 rounded-lg my-4 mx-2">
        <button className="w-full h-full" onClick={handleExport}>
          <p className="text-2xl text-white font-semibold">Export Data</p>
        </button>
      </div>
      <div className="h-[30%] flex flex-col bg-background-green-200 bg-opacity-80 rounded-lg my-4 mx-2 p-5">
        <p className="text-xl font-bold text-white">Outcomes</p>
        <div className="flex justify-center items-center h-full">
            <Outcomes outcomes={selectedOutcome} />
        </div>
      </div>
      <div className="h-[45%] flex flex-col bg-background-green-200 bg-opacity-80 rounded-lg my-4 mx-2 overflow-auto">
        <p className="text-xl font-bold text-white px-5 py-5">Predicate</p>
        <Predicates predicates={selectedEdge} nodes={nodes} />
      </div>
      <div className="h-[45%] flex flex-col bg-background-green-200 bg-opacity-80 rounded-lg my-4 mx-2 overflow-auto">
        <p className="text-xl font-bold text-white px-5 py-5">Actions</p>
        <Actions edge={selectedEdge} nodes={nodes}/>
      </div>
    </>
  );
}

export default TreeSideBarRight;
