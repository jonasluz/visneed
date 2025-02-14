import React, { useState } from "react";
import User from "./User";
import Nodes from "../components/Nodes"
import Connections from "./Connections";

function TreeSidebarLeft({ onImport, nodes, selectedConnections }) {

  const handleFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target.result;
          const data = JSON.parse(content);
          console.log(data)
          // Transformação do formato
          const transformedData = transformTreeData(data);
  
          console.log(transformedData)
          onImport(transformedData);
        } catch (error) {
          alert("Erro ao ler o arquivo JSON.");
          console.log(error);
        }
      };
      reader.readAsText(file);
    }
  };
  
  function transformTreeData(data) {
    console.log(data)
    const nodesArray = data.nodes.map((node) => ({
      node: node,
      id: node.id,
      label: node.name, // Usamos o nome como label do nó
      outcome: Array.isArray(node.outcomes) && node.outcomes.length > 0? node.outcomes[0]?.key : "No outcome"
    }));
  
    const edgesArray = [];
    data.nodes.forEach((node) => {
      node.connections.forEach((conn) => {
        edgesArray.push({
          from: node.id,
          to: conn.targetId, // Arestas ligam nós pelos IDs
        });
      });
    });

    return { nodesArray, edgesArray };
  }
  

  return (
    <div className="flex flex-col bg-background-green-200 w-full h-full bg-opacity-70">
      <div className="flex flex-row w-full h-[15%] items-center justify-around">
        <p className="text-3xl font-bold text-white">Vis Need</p>
      </div>
      <div className="flex flex-col h-[45%] p-4 border-b">
        <h1 className="text-xl font-bold text-white">Nodes</h1>
        <Nodes nodes={nodes}/>
      </div>
      <div className="flex flex-col h-[30%] p-4 border-b">
        <h1 className="text-xl font-bold text-white">Connections</h1>
        <Connections connections={selectedConnections} />
      </div>
      <div className="flex flex-col h-[10%] justify-center p-6">
      <input
          type="file"
          accept=".json"
          onChange={handleFile}
          style={{ display: "none" }}
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="flex bg-background-green-400 p-2 rounded-lg cursor-pointer justify-center"
        >
          <p className="text-lg font-semibold">Import</p>
        </label>
      </div>
    </div>
  );
}

export default TreeSidebarLeft;