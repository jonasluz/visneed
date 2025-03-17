import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import closeIcon from "../../../../assets/close.png";

function AddNodeModal({ isOpen, onClose, onConfirm, nodes }) {
  const [parentNodeId, setParentNodeId] = useState();
  const [newNodeName, setNewNodeName] = useState('');
  const [predicateInfo, setPredicateInfo] = useState({
    key: '',
    value: '',
    condition: '=',
    logicalOperator: ''
  });
  const [outcomeInfo, setOutcomeInfo] = useState({
    key: '',
    operator: '=',
    value: '',
  })
  const [actionInfo, setActionInfo] = useState({
    key: '',
    operator: '=',
    value: '',
  })

  if (!isOpen) return null;

  const handleConfirm = () => {
    if(!newNodeName) {
      toast.error("Node name is empty")
    } else {
      onConfirm(parentNodeId, newNodeName, predicateInfo, outcomeInfo, actionInfo);
      onClose();
      setParentNodeId();
      setNewNodeName("");
      setPredicateInfo({ key: '', value: '', condition: '=', logicalOperator: '' });
      setOutcomeInfo({ key: '', operator: '=', value: '' })
      setActionInfo({ key: '', operator: '=', value: '' })
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="relative bg-background-green-100 w-fit h-fit p-12 rounded-lg overflow-y-auto scrollbar-none">
      <button className='absolute w-8 h-8 top-5 right-5 cursor-pointer' onClick={onClose}>
        <img src={closeIcon} alt="" className='w-full h-full object-contain' />
      </button>
        
        {/* Title */}
        <h2 className="text-xl font-bold mb-4">Add a new Node</h2>
        <div className='flex flex-row'>
          <div className="mb-4 basis-1/3 px-4">
            {/* Parent node input */}
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
          
          {/* Node name input */}
          <div className="mb-6 basis-1/3 px-4">
            <label className="block text-sm font-medium mb-2">Node name:</label>
            <input
              placeholder='Ex: Node 1'
              type="text"
              className="w-full p-2 border rounded text-black"
              value={newNodeName}
              onChange={(e) => setNewNodeName(e.target.value)}
              spellCheck={false}
              />
          </div>
        </div>
        
        {/* Outcome input */}
        <div className={`mb-4 w-full `}>
          <label className='block text-lg font-semibold mb-2 px-4'>Outcomes:</label>
          <div className="flex flex-row px-4">
            <div className='basis-1/3 px-4'>
              <label className="block text-sm font-medium mb-2">Key</label>
              <input
                placeholder='Ex: hp improve'
                type="text"
                className="w-full p-2 border rounded text-black"
                value={outcomeInfo.key}
                onChange={(e) => setOutcomeInfo({ ...outcomeInfo, key: e.target.value })}/>
              <label className='text-sm text-red-700'>Blank outcome = "No outcome"</label>
            </div>
            <div className='basis-1/10 px-4'>
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
            <div className='basis-1/3 px-4'>
              <label className="block text-sm font-medium mb-2">Value</label>
              <input
                placeholder='Ex: 5'
                type="text"
                className="w-full p-2 border rounded text-black"
                value={outcomeInfo.value}
                onChange={(e) => setOutcomeInfo({ ...outcomeInfo, value: e.target.value })}/>
            </div>
          </div>
        </div>
        
        {/* Predicate input */}
        <div className={`mb-4 w-full ${nodes.length < 1 ? "hidden" : "block"}`}>
          <label className='block text-lg font-semibold mb-2 px-4'>Predicate:</label>
          <div className="flex flex-row px-4">
            <div className='basis-1/3 px-4'>
              <label className="block text-sm font-medium mb-2">Key</label>
              <input
                placeholder='Ex: Option'
                type="text"
                className="w-full p-2 border rounded text-black px-4"
                value={predicateInfo.key}
                onChange={(e) => setPredicateInfo({ ...predicateInfo, key: e.target.value })}
              />
              <label className='text-sm text-red-700'>Blank predicate = "No predicate"</label>
            </div>
            <div className='basis-1/10 px-4'>
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
            <div className='basis-1/3 px-4'>
              <label className="block text-sm font-medium mb-2">Value</label>
                <input
                  placeholder='Ex: 1'
                  type="text"
                  className="w-full p-2 border rounded text-black"
                  value={predicateInfo.value}
                  onChange={(e) => setPredicateInfo({ ...predicateInfo, value: e.target.value })}/>
            </div>
            <div className='basis-2/10 px-4'>
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
        </div>

        {/* Action input */}
        <div className={`mb-4 w-full ${nodes.length < 1 ? "hidden" : "block"}`}>
          <label className='block text-lg font-semibold mb-2 px-4'>Actions:</label>
          <div className="flex flex-row px-4">
            <div className='basis-1/3 px-4'>
              <label className="block text-sm font-medium mb-2">Key</label>
              <input
                placeholder='Ex: freedom'
                type="text"
                className="w-full p-2 border rounded text-black"
                value={actionInfo.key}
                onChange={(e) => setActionInfo({ ...actionInfo, key: e.target.value })}/>
              <label className='text-sm text-red-700'>Blank action = "No actions"</label>
            </div>
            <div className='basis-1/10 px-4'>
              <label className="block text-sm font-medium mb-2">Operator</label>
              <select
              className="w-full p-2 border rounded text-black"
              value={actionInfo.operator}
              onChange={(e) => setActionInfo({ ...actionInfo, operator: e.target.value })}>
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
            <div className='basis-1/3 px-4'>
              <label className="block text-sm font-medium mb-2">Value</label>
                <input
                  placeholder='Ex: True'
                  type="text"
                  className="w-full p-2 border rounded text-black"
                  value={actionInfo.value}
                  onChange={(e) => setActionInfo({ ...actionInfo, value: e.target.value })}/>
            </div>
          </div>
        </div>

        <div className="flex mt-8">
          <button
            className="bg-background-red-300 hover:brightness-50 ease-in-out duration-100 text-white text-sm p-4 px-8 rounded font-semibold font-rubik-semibold border border-black"
            onClick={() => {onClose(); toast.error("Action canceled!")}}>
            Cancel
          </button>
          <button
            className="bg-background-green-400 hover:brightness-50 ease-in-out duration-100 text-white text-sm p-4 px-8 mx-4 rounded font-semibold font-rubik-semibold border border-black"
            onClick={handleConfirm}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddNodeModal;