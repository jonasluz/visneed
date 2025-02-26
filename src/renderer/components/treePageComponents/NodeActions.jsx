import React, { useState } from 'react';
import AddNodeModal from './AddNodeModal';
import addIcon from "../../../assets/add-symbol.png";

function NodeActions({ nodes, onAddNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddNode = (parentNodeId, newNodeName, predicateInfo) => {
    onAddNode(parentNodeId, newNodeName, predicateInfo);
  };

  return (
    <div className='flex flex-col'>
      <button 
        className='bg-background-green-400 w-9 h-9 p-3 hover:-translate-y-2 hover:w-10 hover:h-10 rounded-lg hover:brightness-50 ease-in-out duration-200'
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