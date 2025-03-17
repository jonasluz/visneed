import React, { useEffect, useState } from 'react';
import AddNodeModal from './Modals/AddNodeModal';
import addIcon from "../../../assets/add-symbol.png";
import deleteIcon from "../../../assets/delete.png";
import editIcon from "../../../assets/edit.png";
import DeleteNodeModal from './Modals/DeleteNodeModal';

function NodeActions({ nodes, onAddNode, onDeleteNode, nodeSelected }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [isNodeSelected, setIsNodeSelected] = useState(false)

  useEffect(() => {
    if(Object.keys(nodeSelected).length !== 0) {
      setIsNodeSelected(false);
    } else {
      setIsNodeSelected(true);
    }

  }, [nodeSelected])

  const handleAddNode = (parentNodeId, newNodeName, predicateInfo, outcomeInfo, actionInfo) => {
    onAddNode(parentNodeId, newNodeName, predicateInfo, outcomeInfo, actionInfo);
  };
  
  const handleDeleteNode = (treeId) => {
    onDeleteNode(treeId)
  }

  return (
    <div className='flex flex-col'>      
      {/*Add node action*/}
      <button 
        className='bg-background-green-400 mb-2 w-9 h-9 p-3 rounded-lg hover:brightness-50 ease-in-out duration-200'
        onClick={() => setIsAddModalOpen(true)}
      >
        <img src={addIcon} alt="" className="object-cover w-full h-full" />
      </button>

      {/* Edit node action */}
      <button
        className='bg-background-green-400 mb-2 w-9 h-9 p-3 rounded-lg hover:brightness-50 ease-in-out duration-200 disabled:brightness-50 disabled:hover:translate-y-0 disabled:hover:w-9 disabled:hover:h-9'
        disabled={isNodeSelected}>
        <img src={editIcon} alt="" className="object-cover w-full h-full" />
      </button>

      {/*Delete node action*/}
      <button 
        className='bg-background-green-400 w-9 h-9 p-3 rounded-lg hover:brightness-50 ease-in-out duration-200 disabled:brightness-50 disabled:hover:translate-y-0 disabled:hover:w-9 disabled:hover:h-9'
        onClick={() => setIsDeleteModalOpen(true)}
        disabled={isNodeSelected}
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
        nodeSelected={nodeSelected}
        nodes={nodes}
      />
      
    </div>
  );
}

export default NodeActions;