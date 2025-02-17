import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import TreeSidebarLeft from '../components/TreeSidebarLeft';
import TreeSideBarRight from '../components/TreeSideBarRight';
import TreeView from '../components/TreeView';

function TreePage() {

  const [tree, setTree] = useState({});

  const [selectedConnections, setSelectedConnections] = useState({});
  const [selectedOutcome, setSelectedOutcome] = useState()
  const [selectedPredicates, setSelectedPredicates] = useState({});

  const handleNodeClick = (nodeId) => {
    const connectedNodes = tree.edgesArray
    .filter((edge) => edge.from === nodeId || edge.to === nodeId)
    .map((edge) => {
      // Encontrar o nó de destino ou origem da conexão
      const targetNodeId = edge.from === nodeId ? edge.to : edge.from;
      // Encontrar o label e id do nó de destino
      const targetNode = tree.nodesArray.find(node => node.id === targetNodeId);
      return targetNode ? { id: targetNode.id, label: targetNode.label, outcome: targetNode.outcome } : null; 
    })
    .filter(Boolean);
    console.log(connectedNodes)
    setSelectedConnections(connectedNodes);
    setSelectedOutcome(tree.nodesArray[nodeId - 1].outcome)
  };

  const handleEdgeClick = (edgeData) => {
    console.log(edgeData)
    setSelectedPredicates(edgeData)
  }

  const handleImport = (data) => {
    setTree({
      nodesArray: data.nodesArray,
      edgesArray: data.edgesArray,
    });
  };

  return (
    <div className="relative w-full h-screen bg-background-black-100">
      {/* Conteúdo central */}
      <div className="w-full h-full flex justify-center items-center ">
        <TreeView nodesArray={tree.nodesArray} edgesArray={tree.edgesArray} onNodeClick={handleNodeClick} onEdgeClick={handleEdgeClick}/>
      </div>

      {/* Left Sidebar (Overlay) */}
      <div className="absolute top-0 left-0 w-1/6 h-full z-10">
        <TreeSidebarLeft onImport={handleImport} nodes={tree.nodesArray} edges={tree.edgesArray} selectedConnections={selectedConnections}/>
      </div>

      {/* Right Sidebar (Overlay) */}
      <div className="absolute top-0 right-0 w-[30%] h-full z-10 p-4 overflow-y-auto">
        <TreeSideBarRight selectedOutcome={selectedOutcome} selectedEdge={selectedPredicates} nodes={tree.nodesArray}/>
      </div>
    </div>
  );
}

export default TreePage;
