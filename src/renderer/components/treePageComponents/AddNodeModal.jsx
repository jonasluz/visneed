import React, { useEffect, useState } from 'react';

function AddNodeModal({ isOpen, onClose, onConfirm, nodes }) {
  const [parentNodeId, setParentNodeId] = useState('');
  const [newNodeName, setNewNodeName] = useState('');
  const [predicateInfo, setPredicateInfo] = useState({
    key: '',
    value: '',
    condition: '=',
    logicalOperator: 'OR'
  });
  const [outcomeInfo, setOutcomeInfo] = useState({
    key: '',
    operator: '',
    value: '',
  })

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm(parentNodeId, newNodeName, predicateInfo);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-background-green-100 w-[60%] h-[75%] p-6 rounded-lg overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Add a new Node</h2>
        <div className='flex flex-row justify-between'>
          <div className="mb-4 w-[40%]">
            <label className="block text-sm font-medium mb-2">Parent Node:</label>
            <select
              className="w-full p-2 border rounded text-black"
              value={parentNodeId}
              onChange={(e) => setParentNodeId(e.target.value)}
            >
              <option value="">Select a node parent</option>
              {nodes.map(node => (
                <option key={node.id} value={node.id}>{node.name}</option>
              ))}
              {console.log()}
            </select>
          </div>
          
          <div className="mb-6 w-[55%]">
            <label className="block text-sm font-medium mb-2">Node name:</label>
            <input
              placeholder='Ex: Node 1'
              type="text"
              className="w-full p-2 border rounded text-black"
              value={newNodeName}
              onChange={(e) => setNewNodeName(e.target.value)}/>
          </div>
        </div>
        
        {/* Outcome input */}
        <div className="mb-4 w-full">
          <label className='block text-lg font-semibold mb-2'>Outcomes:</label>
          <div className="flex flex-row justify-between">
            <div className='w-[45%]'>
              <label className="block text-sm font-medium mb-2">Key</label>
              <input
                placeholder='Ex: hp improve'
                type="text"
                className="w-full p-2 border rounded text-black"
                value={outcomeInfo.key}
                onChange={(e) => setOutcomeInfo({ ...outcomeInfo, key: e.target.value })}
              />
            </div>
            <div className='w-[8%]'>
              <label className="block text-sm font-medium mb-2">Operator</label>
              <select
              className="w-full p-2 border rounded text-black"
              value={outcomeInfo.operator}
              onChange={(e) => setOutcomeInfo({ ...outcomeInfo, operator: e.target.value })}>
                <option value="=">=</option>
                <option value="!=">!=</option>
                <option value="<">&lt;</option>
                <option value=">">&gt;</option>
                <option value="<=">&lt;=</option>
                <option value=">=">&gt;=</option>
                <option value="+">+</option>
                <option value="-">-</option>
              </select>
            </div>
            <div className='w-[40%]'>
              <label className="block text-sm font-medium mb-2">Value</label>
                <input
                  placeholder='Ex: 5'
                  type="text"
                  className="w-full p-2 border rounded text-black"
                  value={outcomeInfo.value}
                  onChange={(e) => setOutcomeInfo({ ...outcomeInfo, value: e.target.value })}/>
            </div>
          </div>
          <label className='text-sm text-red-700'>Blank outcome = "No outcome"</label>

        </div>
        
        {/* Predicate input */}
        <div className="mb-4 w-full">
          <label className='block text-lg font-semibold mb-2'>Predicate:</label>
          <div className="flex flex-row justify-between">
            <div className='w-[40%]'>
              <label className="block text-sm font-medium mb-2">Key</label>
              <input
                placeholder='Ex: Option'
                type="text"
                className="w-full p-2 border rounded text-black"
                value={predicateInfo.key}
                onChange={(e) => setPredicateInfo({ ...predicateInfo, key: e.target.value })}
              />
            </div>
            <div className='w-[8%]'>
              <label className="block text-sm font-medium mb-2">Condition</label>
              <select
              className="w-full p-2 border rounded text-black"
              value={predicateInfo.condition}
              onChange={(e) => setPredicateInfo({ ...predicateInfo, condition: e.target.value })}>
                <option value="=">=</option>
                <option value="!=">!=</option>
                <option value="<">&lt;</option>
                <option value=">">&gt;</option>
                <option value="<=">&lt;=</option>
                <option value=">=">&gt;=</option>
              </select>
            </div>
            <div className='w-[35%]'>
              <label className="block text-sm font-medium mb-2">Value</label>
                <input
                  placeholder='Ex: 1'
                  type="text"
                  className="w-full p-2 border rounded text-black"
                  value={predicateInfo.value}
                  onChange={(e) => setPredicateInfo({ ...predicateInfo, value: e.target.value })}/>
            </div>
            <div className='w-[10%]'>
              <label className="block text-sm font-medium mb-2">Log. OP</label>
              <select
              className="w-full p-2 border rounded text-black"
              value={predicateInfo.logicalOperator}
              onChange={(e) => setPredicateInfo({ ...predicateInfo, logicalOperator: e.target.value })}>
                <option value="OR">OR</option>
                <option value="AND">AND</option>
              </select>
            </div>
          </div>
          <label className='text-sm text-red-700'>Blank predicate = "No predicate"</label>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-red-800 hover:brightness-50 ease-in-out duration-100 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-background-green-400 hover:brightness-50 ease-in-out duration-100 text-white px-4 py-2 rounded"
            onClick={handleConfirm}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNodeModal;