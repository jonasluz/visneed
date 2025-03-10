import React from 'react'

function DeleteNodeModal({ isOpen, onClose, selectedNode, onConfirm }) {
    if (!isOpen) return null;
    console.log(selectedNode)

    const handleConfirm = () => {
        
        onConfirm(selectedNode.id);
        onClose();
    }

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-background-green-100 w-[60%] h-[75%] p-6 rounded-lg overflow-y-auto scrollbar-none">
        <p>You are about to deleted the node "{selectedNode.name}"</p>
        <button onClick={handleConfirm}>confirm</button>
      </div>
    </div>
  )
}

export default DeleteNodeModal