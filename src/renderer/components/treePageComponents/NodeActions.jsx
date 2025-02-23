import React, { useState } from 'react';
import AddNodeModal from '../../AddNodeModal';
import addIcon from "../../../assets/add-symbol.png";

function NodeActions({ nodes, onAddNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNode = (parentNodeId, newNodeName) => {
    onAddNode(parentNodeId, newNodeName);
  };

  return (
    <div className='flex flex-col'>
      <button 
        className='bg-background-green-400 w-8 h-8 p-2 rounded-md hover:brightness-50 ease-in-out duration-200'
        onClick={() => setIsModalOpen(true)}
      >
        <img src={addIcon} alt="" className="object-cover w-full h-full" />
      </button>
      <AddNodeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAddNode}
        nodes={nodes}
      />
    </div>
  );
}

export default NodeActions;