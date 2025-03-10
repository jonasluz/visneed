import React, { useState } from 'react';
import AddNodeModal from './Modals/AddNodeModal';
import addIcon from "../../../assets/add-symbol.png";
import deleteIcon from "../../../assets/delete.png"
import DeleteNodeModal from './Modals/DeleteNodeModal';
function NodeActions({ nodes, onAddNode, onDeleteNode, nodeSelected }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleAddNode = (parentNodeId, newNodeName, predicateInfo, outcomeInfo, actionInfo) => {
    onAddNode(parentNodeId, newNodeName, predicateInfo, outcomeInfo, actionInfo);
  };
  
  const handleDeleteNode = (treeId) => {
    onDeleteNode(treeId)
  }

  return (
    <div className='flex flex-col'>
      <button 
        className='bg-background-green-400 mb-2 w-9 h-9 p-3 hover:-translate-y-2 hover:w-10 hover:h-10 rounded-lg hover:brightness-50 ease-in-out duration-200'
        onClick={() => setIsAddModalOpen(true)}
      >
        <img src={addIcon} alt="" className="object-cover w-full h-full" />
      </button>

      {/*Delete node action*/}
      <button 
        className='bg-background-green-400 w-9 h-9 p-3 hover:-translate-y-2 hover:w-10 hover:h-10 rounded-lg hover:brightness-50 ease-in-out duration-200'
        onClick={() => setIsDeleteModalOpen(true)}
      >
        <img src={deleteIcon} alt="" className="object-cover w-full h-full" />
      </button>

      <AddNodeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onConfirm={handleAddNode}
        nodes={nodes}
      />

      <DeleteNodeModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        selectedNode={nodeSelected}
        onConfirm={handleDeleteNode}
      />
      
    </div>
  );
}

export default NodeActions;