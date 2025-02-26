import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import TreeSidebarLeft from '../components/treePageComponents/TreeSidebarLeft';
import TreeSideBarRight from '../components/treePageComponents/TreeSideBarRight';
import TreeView from '../components/treePageComponents/TreeView';
import NodeActions from '../components/treePageComponents/NodeActions';
import { useParams } from "react-router-dom";

import treeImage from '../../assets/decision-tree-image.png';
import minimizeImage from '../../assets/minimize.png';
import maximizeImage from '../../assets/maximize.png';

//notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TreePage() {
  const { treeId } = useParams();
  const [tree, setTree] = useState({});
  const [projectName, setProjectName] = useState("");
  const [minimized, setMinimized] = useState(true);

  const [selectedNode, setSelectedNode] = useState({});
  const [selectedConnections, setSelectedConnections] = useState({});
  const [selectedOutcome, setSelectedOutcome] = useState();
  const [selectedPredicates, setSelectedPredicates] = useState({});

  const handleNodeClick = (nodeId) => {
    setSelectedNode(tree.nodesArray[nodeId - 1])

    const connectedNodes = tree.edgesArray
      .filter((edge) => edge.from === nodeId || edge.to === nodeId)
      .map((edge) => {
        const targetNodeId = edge.from === nodeId ? edge.to : edge.from;
        const targetNode = tree.nodesArray.find(node => node.id === targetNodeId);
        return targetNode ? { id: targetNode.id, name: targetNode.name, outcome: targetNode.outcome } : null;
      })
      .filter(Boolean);

    setSelectedConnections(connectedNodes);
    setSelectedOutcome(tree.nodesArray[nodeId - 1].outcomes);
  };

  const handleEdgeClick = (edgeData) => {
    setSelectedPredicates(edgeData);
  };

  const handleBakcgroundClick = () => {
    setSelectedPredicates({});
    setSelectedConnections({});
    setSelectedNode({});
    setSelectedOutcome();
  }

  const handleImport = (data) => {
    setTree({
      nodesArray: data.nodesArray,
      edgesArray: data.edgesArray,
      dictionary: data.dictionary
    });
    setProjectName(data.projectName);
  };

  const handleMinimized = () => {
    setMinimized(!minimized)
  }

  const handleAddNode = (parentNodeId, newNodeName, predicateInfo, outcomeInfo, actionInfo) => {
    if (!parentNodeId) {
      toast.success(`New tree created with root ${newNodeName}`);
    } else {
      toast.success(`Nó ${newNodeName}, criado com sucesso!`); 
    }

    const newNodeId = tree.nodesArray.length + 1;

    const newNode = {
      id: newNodeId,
      name: newNodeName,
      connections: [],
      outcomes: [{key: outcomeInfo.key, operator: outcomeInfo.operator, value: outcomeInfo.value}],
    };

    console.log(newNode)

    // Criar a nova conexão para o nó pai
    const newConnection = {
      name: `${parentNodeId}-${newNodeId}`, // Nome da conexão (ex: "1-2")
      targetId: newNodeId,
      gate: {
        predicates: [{key: predicateInfo.key, condition: predicateInfo.condition, value: predicateInfo.value, logicalOperator: predicateInfo.logicalOperator}], 
        actions: [{key: actionInfo.key, operator: actionInfo.operator, value: actionInfo.value}], 
      },
    };

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
      predicate: {key: predicateInfo.key, condition: predicateInfo.condition, value: predicateInfo.value, logicalOperator: predicateInfo.logicalOperator},
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
  };

  return (
    <div className="relative w-full h-screen bg-background-black-100">
      <ToastContainer />
      {/* Tree View */}
      <div className="w-full h-full flex justify-center items-center ">
        <TreeView nodesArray={tree.nodesArray} edgesArray={tree.edgesArray} onNodeClick={handleNodeClick} onEdgeClick={handleEdgeClick} onBackgroundClick={handleBakcgroundClick}/>
      </div>

      {/* Left Side Bar */}
      <div className={`absolute top-0 left-0 w-1/6 h-full z-10 ${minimized ? 'visible' : 'hidden'}`}>
        <TreeSidebarLeft treeId={treeId} onImport={handleImport} nodes={tree.nodesArray} edges={tree.edgesArray} selectedConnections={selectedConnections} />
      </div>

      {/* Tree Project Name */}
      <div className={`flex flex-col absolute top-0 ${minimized ? 'left-[17%]' : 'left-0'}`}>
        <div className="flex flex-row p-4 text-white items-center">
          <img src={treeImage} alt="" className='w-8 h-8 object-cover invert' />
          <p className='ml-2 font-semibold'>{projectName}</p>
        </div>

        <div className="flex flex-row px-4 py-1 text-sm text-neutral-200">
          <p className='ml-2 font-semibold'>Current Node: </p>
          <p className='ml-2 font-semibold text-background-green-400'>{selectedNode.name}</p>
        </div>

        <div className="flex flex-row px-4 py-1 text-sm text-neutral-200">
          <p className='ml-2 font-semibold'>Current connections: </p>
          <p className='ml-2 font-semibold text-background-green-400'>{selectedConnections.length}</p>
        </div>
      </div>
      
      {/* Node Selected */}
      <div className={`absolute bottom-0 p-2 text-white items-center h-[25%] ${minimized ? 'left-[17%]' : 'left-5'}`}>
        <NodeActions nodes={tree.nodesArray} onAddNode={handleAddNode} />
      </div>

      <div className={`absolute bottom-5 p-2 text-white items-center ${minimized ? 'right-[30%]' : 'right-5'}`}>
        <button 
        className='bg-background-green-400 w-9 h-9 p-2 rounded-lg hover:brightness-50 ease-in-out duration-200'
        onClick={handleMinimized}>
          {
            minimized ?
              <img src={minimizeImage} alt="" /> : 
              <img src={maximizeImage} alt="" /> 
          }
        </button>
      </div>

      <div className={`absolute top-0 right-0 w-[30%] h-full z-10 p-4 overflow-y-auto scrollbar-none ${minimized ? 'visible' : 'hidden'}`}>
        <TreeSideBarRight selectedOutcome={selectedOutcome} selectedEdge={selectedPredicates} nodes={tree.nodesArray} />
      </div>
    </div>
  );
}

export default TreePage;