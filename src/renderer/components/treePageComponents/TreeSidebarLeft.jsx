import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nodes from "./sidebarLeftComponents/Nodes"
import Connections from "./sidebarLeftComponents/Connections";

import { toast } from "react-toastify";

function TreeSidebarLeft({ treeId, onImport, nodes, selectedConnections, changedTree }) {

  useEffect(() => {
    console.log("Tree has changed");
    async function loadStoredJson() {
      try {
        const response = await window.treeAPI.loadTree(treeId);
        if (response) {
          const transformedData = transformTreeData(response);
          onImport(transformedData);
        }
      } catch (error) {
        console.error("Error loading tree:", error);
      }
    }
    loadStoredJson();
  }, [changedTree]);

  const handleFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const content = e.target.result;
          const data = JSON.parse(content);
          console.log("Dado do json: ", data)

          // Transformação do formato
          const transformedData = transformTreeData(data);
          console.log("Dado do json transformado: ", transformedData)
          onImport(transformedData);

          console.log(data)
          await window.treeAPI.saveTree(treeId, data);
          toast.success("Import was successfully done!")
        } catch (error) {
          alert("Erro ao ler o arquivo JSON.");
          console.log(error);
        }
      };
      reader.readAsText(file);
    }
  };
  
  function transformTreeData(data) {
    const projectName = data.name 
    const dictionary = data.dictionary

    const nodesArray = data.nodes.map((node) => ({
      id: node.id,
      name: node.name,
      connections: node.connections.map((conn) => ({
        name: conn.name,
        targetId: conn.targetId,
        gate: {
          predicates: conn.gate?.predicates?.length > 0 ? conn.gate.predicates : "No predicates",
          actions: conn.gate?.actions?.length > 0 ? conn.gate.actions : "No action"
        }
      })),
      outcomes: Array.isArray(node.outcomes) && node.outcomes.length > 0 ? node.outcomes : "No outcome"
    }));
  
    const edgesArray = [];

    console.log(data)

    data.nodes.forEach((node) => {
      node.connections.forEach((conn) => {
        edgesArray.push({
          from: node.id,
          to: conn.targetId,
          predicate: conn.gate?.predicates == "No predicates" || conn.gate?.predicates.length < 1 ? "No predicates" : conn.gate.predicates[0],
          actions: conn.gate?.actions == "No action" || conn.gate?.actions.length < 1 ? "No action" : conn.gate?.actions?.[0]
        });
      });
    });
    return { nodesArray, edgesArray, projectName, dictionary };
  }

  return (
    <div className="flex flex-col bg-background-green-200 w-full h-full bg-opacity-90 backdrop-blur-sm">
      <div className="flex flex-row w-full h-[15%] items-center justify-around">
        <p className="text-3xl font-bold text-white py-10">VisNeed</p>
      </div>
      <div className="flex flex-col h-[40%] p-4 border-b">
        <h1 className="text-xl font-bold text-white py-2">Nodes</h1>
        <Nodes nodes={nodes}/>
      </div>
      <div className="flex flex-col h-[35%] p-4 border-b">
        <h1 className="text-xl font-bold text-white py-2">Connections</h1>
        <Connections connections={selectedConnections} />
      </div>
      <div className="flex flex-col h-[10%] justify-center p-6">
        <input
        type="file"
        accept=".json"
        onChange={handleFile}
        style={{ display: "none" }}
        id="fileInput"/>
        <label htmlFor="fileInput" className="flex bg-background-green-400 p-2 rounded-lg cursor-pointer justify-center">
          <p className="text-lg font-semibold">Import</p>
        </label>
      </div>
    </div>
  );
}

export default TreeSidebarLeft;