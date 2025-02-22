import React, { useState } from 'react';

function AddNodeModal({ isOpen, onClose, onConfirm, nodes }) {
  const [parentNodeId, setParentNodeId] = useState('');
  const [newNodeName, setNewNodeName] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(parentNodeId, newNodeName);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-black p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Adicionar Novo Nó</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Nó Pai:</label>
          <select
            className="w-full p-2 border rounded text-black"
            value={parentNodeId}
            onChange={(e) => setParentNodeId(e.target.value)}
          >
            <option value="">Selecione um nó pai</option>
            {nodes.map(node => (
              <option key={node.id} value={node.id}>{node.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Nome do Novo Nó:</label>
          <input
            type="text"
            className="w-full p-2 border rounded text-black"
            value={newNodeName}
            onChange={(e) => setNewNodeName(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleConfirm}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNodeModal;