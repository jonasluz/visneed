import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import TreeSidebarLeft from '../components/treePageComponents/TreeSidebarLeft';
import TreeSideBarRight from '../components/treePageComponents/TreeSideBarRight';
import TreeView from '../components/treePageComponents/TreeView';
import NodeActions from '../components/treePageComponents/NodeActions';
import { useParams } from "react-router-dom";

import treeImage from '../../assets/decision-tree-image.png';
//notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TreePage() {
  const { treeId } = useParams();
  const [tree, setTree] = useState({});
  const [projectName, setProjectName] = useState("");

  const [selectedNode, setSelectedNode] = useState({});
  const [selectedConnections, setSelectedConnections] = useState({});
  const [selectedOutcome, setSelectedOutcome] = useState();
  const [selectedPredicates, setSelectedPredicates] = useState({});

  const handleNodeClick = (nodeId) => {
    setSelectedNode(tree.nodesArray[nodeId - 1])
    console.log(tree.nodesArray[nodeId - 1])

    const connectedNodes = tree.edgesArray
      .filter((edge) => edge.from === nodeId || edge.to === nodeId)
      .map((edge) => {
        const targetNodeId = edge.from === nodeId ? edge.to : edge.from;
        const targetNode = tree.nodesArray.find(node => node.id === targetNodeId);
        return targetNode ? { id: targetNode.id, name: targetNode.name, outcome: targetNode.outcome } : null;
      })
      .filter(Boolean);
    setSelectedConnections(connectedNodes);
    setSelectedOutcome(tree.nodesArray[nodeId - 1].outcome);
  };

  const handleEdgeClick = (edgeData) => {
    setSelectedPredicates(edgeData);
  };

  const handleImport = (data) => {
    setTree({
      nodesArray: data.nodesArray,
      edgesArray: data.edgesArray,
      dictionary: data.dictionary
    });
    setProjectName(data.projectName);
  };

  const handleAddNode = (parentNodeId, newNodeName) => {
    console.log(parentNodeId)
    if (!parentNodeId || !newNodeName) {
      toast.error("Por favor, selecione um nó pai e insira um nome para o novo nó.");
      return;
    }

    const newNodeId = tree.nodesArray.length + 1;

    const newNode = {
      id: newNodeId,
      name: newNodeName,
      outcome: "No outcome",
      connections: [],
    };

    console.log(newNode)

    // Criar a nova conexão para o nó pai
    const newConnection = {
      name: `${parentNodeId}-${newNodeId}`, // Nome da conexão (ex: "1-2")
      targetId: newNodeId, // ID do nó filho
      gate: {
        predicates: [], // Predicados vazios
        actions: [], // Ações vazias
      },
    };

  // Att the parent node with the new connection
  const updatedNodesArray = tree.nodesArray.map((node) => {
    if (node.id === parseInt(parentNodeId)) {
      return {
        ...node,
        connections: [...node.connections, newConnection], // Adiciona a nova conexão
      };
    }
    return node;
  });

  updatedNodesArray.push(newNode);

    const newEdge = {
      from: parseInt(parentNodeId),
      to: newNodeId,
      predicate: "No predicate",
      actions: "No action"
    };

    const newDictionaryElem = {
      key: newNodeName,
      type: "string"
    }

    const updatedEdgesArray = [...tree.edgesArray, newEdge];
    const updatedDictionary = [...tree.dictionary, newDictionaryElem];

    setTree({
      nodesArray: updatedNodesArray,
      edgesArray: updatedEdgesArray,
      dictionary: updatedDictionary
    });

    // update json with new node
    const updatedData = {
      nodes: updatedNodesArray.map(node => ({
        ...node,
        name: node.name 
      })),
      edges: updatedEdgesArray,
      dictionary: updatedDictionary,
      projectName: projectName
    };

    window.treeAPI.saveTree(treeId, updatedData);
    toast.success(`Nó ${newNodeName}, criado com sucesso!`);  
  };

  return (
    <div className="relative w-full h-screen bg-background-black-100">
      <ToastContainer />
      <div className="w-full h-full flex justify-center items-center ">
        <TreeView nodesArray={tree.nodesArray} edgesArray={tree.edgesArray} onNodeClick={handleNodeClick} onEdgeClick={handleEdgeClick} />
      </div>
      <div className="absolute top-0 left-0 w-1/6 h-full z-10">
        <TreeSidebarLeft treeId={treeId} onImport={handleImport} nodes={tree.nodesArray} edges={tree.edgesArray} selectedConnections={selectedConnections} />
      </div>
      {/* Tree Project Name */}
      <div className="flex flex-row absolute top-0 left-[16%] p-4 text-white items-center">
        <img src={treeImage} alt="" className='w-8 h-8 object-cover invert' />
        <p className='ml-2 font-semibold'>{projectName}</p>
      </div>

      {/* Node Selected */}
      <div className="flex flex-row absolute top-[7%] left-[16%] p-4 text-sm text-neutral-200">
        <p className='ml-2 font-semibold'>Current Node:  {selectedNode.name}</p>
      </div>
      <div className="absolute bottom-0 left-[17%] p-2 text-white items-center h-[25%]">
        <NodeActions nodes={tree.nodesArray} onAddNode={handleAddNode} />
      </div>
      <div className="absolute top-0 right-0 w-[30%] h-full z-10 p-4 overflow-y-auto scrollbar-none">
        <TreeSideBarRight selectedOutcome={selectedOutcome} selectedEdge={selectedPredicates} nodes={tree.nodesArray} />
      </div>
    </div>
  );
}

export default TreePage;