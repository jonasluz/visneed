import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
//components e telas
import TreeSidebarLeft from '../components/treePageComponents/TreeSidebarLeft';
import TreeSideBarRight from '../components/treePageComponents/TreeSideBarRight';
import TreeView from '../components/treePageComponents/TreeView';
import NodeActions from '../components/treePageComponents/NodeActions';
import Dock from '../components/Dock';
//icones
import treeImage from '../../assets/decision-tree-image.png';
import minimizeImage from '../../assets/minimize.png';
import maximizeImage from '../../assets/maximize.png';
//notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoToHomeModal from '../components/treePageComponents/Modals/GoToHomeModal';

function TreePage() {

  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const { treeId } = useParams();
  const [tree, setTree] = useState({});
  const [minimized, setMinimized] = useState(true);

  const [selectedNode, setSelectedNode] = useState({});
  const [selectedConnections, setSelectedConnections] = useState({});
  const [selectedOutcome, setSelectedOutcome] = useState([]);
  const [selectedPredicates, setSelectedPredicates] = useState({});
  
  const [projectName, setProjectName] = useState("");
  const [update, setUpdate] = useState(false);

  const handleConfirmGoHome = () => {
    setShowModal(false);
    navigate('/'); // Volta para a home
  };

  // When clicked on a node
  const handleNodeClick = (nodeId) => {
    setSelectedNode(tree.nodesArray[nodeId - 1])
    setSelectedOutcome(tree.nodesArray[nodeId - 1]?.outcomes);

    const connectedNodes = tree.edgesArray
      .filter((edge) => edge.from === nodeId || edge.to === nodeId)
      .map((edge) => {
        const targetNodeId = edge.from === nodeId ? edge.to : edge.from;
        const targetNode = tree.nodesArray.find(node => node.id === targetNodeId);
        return targetNode ? { id: targetNode.id, name: targetNode.name, outcome: targetNode.outcome } : null;
      })
      .filter(Boolean);

    setSelectedConnections(connectedNodes);
  };

  // When clicked on a edge
  const handleEdgeClick = (edgeData) => {
    setSelectedPredicates(edgeData);
  };

  // When clicked out of a node or edge
  const handleBakcgroundClick = () => {
    setSelectedPredicates({});
    setSelectedConnections({});
    setSelectedNode({});
    setSelectedOutcome();
    console.log("clicked on background")
  }

  // Import a json to the tree view
  const handleImport = (data) => {
    setTree({
      nodesArray: data.nodesArray,
      edgesArray: data.edgesArray,
      dictionary: data.dictionary
    });
    setProjectName(data.projectName);
  };

  // Minimize or maximize the SideBars
  const handleMinimized = () => {
    setMinimized(!minimized)
  }

  // Add a new node 
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
      outcomes: outcomeInfo.key == '' ? ['No outcome'] : [{key: outcomeInfo.key, operator: outcomeInfo.operator, value: outcomeInfo.value}],
    };
    console.log(newNode)

    // Criar a nova conexão para o nó pai
    const newConnection = {
      name: `${parentNodeId}-${newNodeId}`, // Nome da conexão (ex: "1-2")
      targetId: newNodeId,
      gate: {
        predicates: predicateInfo.key == '' ? ['No predicate'] : [{key: predicateInfo.key, condition: predicateInfo.condition, value: predicateInfo.value, logicalOperator: predicateInfo.logicalOperator}], 
        actions: actionInfo.key == '' ? ['No action'] : [{key: actionInfo.key, operator: actionInfo.operator, value: actionInfo.value}], 
      },
    };

    console.log(newConnection)

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
      predicate: predicateInfo.key == '' ? ['No predicate']: [{key: predicateInfo.key, condition: predicateInfo.condition, value: predicateInfo.value, logicalOperator: predicateInfo.logicalOperator}],
      actions: actionInfo.key == '' ? ['No action'] : [{key: actionInfo.key, operator: actionInfo.operator, value: actionInfo.value}], 
    };

    console.log(newEdge)

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
    setUpdate(true)
  };
  return (
    <div className="relative w-full h-screen bg-background-black-100">
      <Dock currentPage={'treePage'} treeId={treeId} treeName={projectName} onHomeClick={() => setShowModal(true)}/>

      {showModal && (
        <GoToHomeModal 
          onConfirm={handleConfirmGoHome} 
          onCancel={() => setShowModal(false)} 
        />
      )}

      <ToastContainer />
      {/* Tree View */}
      <div className="w-full h-full flex justify-center items-center ">
        <TreeView nodesArray={tree.nodesArray} edgesArray={tree.edgesArray} onNodeClick={handleNodeClick} onEdgeClick={handleEdgeClick} onBackgroundClick={handleBakcgroundClick}/>
      </div>

      {/* Left Side Bar */}
      <div className={`absolute top-0 left-0 w-1/6 h-full z-10 ${minimized ? 'visible' : 'hidden'}`}>
        <TreeSidebarLeft treeId={treeId} onImport={handleImport} nodes={tree.nodesArray} selectedConnections={selectedConnections} changedTree={update}/>
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
      <div className={`absolute bottom-0 p-2 text-white items-center ${minimized ? 'left-[17%]' : 'left-5'}`}>
        <NodeActions nodes={tree.nodesArray} onAddNode={handleAddNode} />
      </div>

      <div className={`absolute bottom-0 p-2 text-white items-center ${minimized ? 'right-[30%]' : 'right-5'}`}>
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
        <TreeSideBarRight selectedOutcome={selectedOutcome} selectedEdge={selectedPredicates} nodes={tree.nodesArray} treeId={treeId} treeName={projectName}/>
      </div>
    </div>
  );
}

export default TreePage;