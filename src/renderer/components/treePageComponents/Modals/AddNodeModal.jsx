import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddNodeModal({ isOpen, onClose, onConfirm, nodes, dictionary }) {
  const modalRef = useRef(null);
  
  const [parentNodeId, setParentNodeId] = useState();
  const [newNodeName, setNewNodeName] = useState('');
  const [predicateInfo, setPredicateInfo] = useState({
    key: '',
    value: '',
    condition: '=',
    logicalOperator: '',
    type: 'string'
  });
  const [outcomeInfo, setOutcomeInfo] = useState({
    key: '',
    operator: '=',
    value: '',
    type: 'string'
  })
  const [actionInfo, setActionInfo] = useState({
    key: '',
    operator: '=',
    value: '',
    type: 'string'
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
      setPredicateInfo({ key: '', value: '', condition: '=', logicalOperator: '', type: 'string' });
      setOutcomeInfo({ key: '', operator: '=', value: '', type: 'string' })
      setActionInfo({ key: '', operator: '=', value: '', type: 'string' })
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      toast.error("Canceled!");
      setPredicateInfo({ key: '', value: '', condition: '=', logicalOperator: '', type: 'string' });
      setOutcomeInfo({ key: '', operator: '=', value: '', type: 'string' })
      setActionInfo({ key: '', operator: '=', value: '', type: 'string' })
      onClose();
    }
  };

  const isKeyInDictionary = (key) => {
    return dictionary.some(item => item.key === key);
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 z-50 bg-black bg-opacity-50 " onClick={handleClickOutside}>
      <div ref={modalRef} className="relative bg-background-green-100 w-fit h-fit p-12 rounded-lg text-white overflow-y-auto scrollbar-none" onClick={(e) => e.stopPropagation()}>
        {/* Title */}
        <div className='flex justify-center'>
          <h2 className="text-3xl font-rubik-bold font-bold mb-8">Add a new Node</h2>
        </div>
        <div className='flex flex-row'>
          <div className="mb-4 basis-1/3 px-4 font-medium">
            {/* Parent node input */}
            <label className="block text-sm mb-2">Parent Node: *</label>
            <select
              className="w-full p-2 border border-white rounded-md text-white bg-transparent"
              value={parentNodeId}
              onChange={(e) => setParentNodeId(e.target.value)}>
              <option value="" className='text-black'>Select a node parent</option>
              {nodes.map(node => (
                <option key={node.id} value={node.id} className='text-black font-medium'>{node.name}</option>
              ))}
            </select>
          </div>
          
          {/* Node name input */}
          <div className="mb-6 basis-1/3 px-4 font-medium">
            <label className="block text-sm mb-2">Node name: *</label>
            <input
              placeholder='Ex: Node 1'
              type="text"
              className="w-full p-2 border border-white rounded-md text-white bg-transparent outline-none"
              value={newNodeName}
              onChange={(e) => setNewNodeName(e.target.value)}
              spellCheck={false}
              />
          </div>
        </div>
        
        {/* Outcome input */}
        <div className={`mb-4 w-full font-medium`}>
          <label className='block text-lg font-semibold mb-2 px-4'>Outcomes:</label>
          <div className="flex flex-row px-4">
            <div className='basis-1/3 px-4'>
              <label className="block text-sm font-medium mb-2">Key</label>
              <input
                list="outcome-keys"
                placeholder='Ex: hp improve'
                type="text"
                className="w-full p-2 border border-white rounded-md text-white bg-transparent outline-none"
                value={outcomeInfo.key}
                onChange={(e) => setOutcomeInfo({ ...outcomeInfo, key: e.target.value })}
              />
              <datalist id="outcome-keys">
                {dictionary.map((item, index) => (
                  <option key={index} value={item.key} />
                ))}
              </datalist>
              <label className='text-sm text-red-700'>Blank outcome = "No outcome"</label>
            </div>
            <div className='basis-1/10 px-4'>
              <label className="block text-sm font-medium mb-2">Operator</label>
              <select
              className="w-full p-2 border border-white rounded-md text-white bg-transparent accent-transparent"
              value={outcomeInfo.operator}
              onChange={(e) => setOutcomeInfo({ ...outcomeInfo, operator: e.target.value })}>
                <option value=""></option>
                <option value="=" className='text-black'>=</option>
                <option value="!=" className='text-black'>!=</option>
                <option value="<" className='text-black'>&lt;</option>
                <option value=">" className='text-black'>&gt;</option>
                <option value="<=" className='text-black'>&lt;=</option>
                <option value=">=" className='text-black'>&gt;=</option>
                <option value="+" className='text-black'>+</option>
                <option value="-" className='text-black'>-</option>
              </select>
            </div>

            <div className='basis-1/3 px-4'>
              <label className="block text-sm font-medium mb-2">Value</label>
              <input
                placeholder='Ex: 5'
                type="text"
                className="w-full p-2 border border-white rounded-md text-white bg-transparent outline-none"
                value={outcomeInfo.value}
                onChange={(e) => setOutcomeInfo({ ...outcomeInfo, value: e.target.value })}/>
            </div>

            <div className='basis-1/7 px-4'>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select 
                className="w-full p-2 border border-white rounded-md text-white bg-transparent"
                value={outcomeInfo.type}
                onChange={(e) => setOutcomeInfo({ ...outcomeInfo, type: e.target.value })}
                disabled={isKeyInDictionary(outcomeInfo.key)}>
                <option value="string" className='text-black'>string</option>
                <option value="integer" className='text-black'>integer</option>
                <option value="boolean" className='text-black'>boolean</option>
              </select>
              {isKeyInDictionary(outcomeInfo.key) && (
                <p className="text-xs text-gray-400 mt-1">Type is locked because this key already exists</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Predicate input */}
        <div className={`mb-4 w-full ${nodes.length < 1 ? "hidden" : "block"} font-medium`}>
          <label className='block text-lg font-semibold mb-2 px-4'>Predicate:</label>
          <div className="flex flex-row px-4">
            {/* Key */}
            <div className='basis-1/3 px-4'>
              <label className="block text-sm font-medium mb-2">Key</label>
              <input
                list="predicate-keys"
                placeholder='Ex: Option'
                type="text"
                className="w-full p-2 border border-white rounded-md text-white bg-transparent outline-none"
                value={predicateInfo.key}
                onChange={(e) => setPredicateInfo({ ...predicateInfo, key: e.target.value })}
              />
              <datalist id="predicate-keys">
                {dictionary.map((item, index) => (
                  <option key={index} value={item.key} />
                ))}
              </datalist>
              <label className='text-sm text-red-700'>Blank predicate = "No predicate"</label>
            </div>
            {/* Condition */}
            <div className='basis-1/10 px-4'>
              <label className="block text-sm font-medium mb-2">Condition</label>
              <select
              className="w-full p-2 border border-white rounded-md text-white bg-transparent"
              value={predicateInfo.condition}
              onChange={(e) => setPredicateInfo({ ...predicateInfo, condition: e.target.value })}>
                <option value=""></option>
                <option value="=" className='text-black'>=</option>
                <option value="!=" className='text-black'>!=</option>
                <option value="<" className='text-black'>&lt;</option>
                <option value=">" className='text-black'>&gt;</option>
                <option value="<=" className='text-black'>&lt;=</option>
                <option value=">=" className='text-black'>&gt;=</option>
              </select>
            </div>
            {/* Value */}
            <div className='basis-1/3 px-4'>
              <label className="block text-sm font-medium mb-2">Value</label>
                <input
                  placeholder='Ex: 1'
                  type="text"
                  className="w-full p-2 border border-white rounded-md text-white bg-transparent outline-none"
                  value={predicateInfo.value}
                  onChange={(e) => setPredicateInfo({ ...predicateInfo, value: e.target.value })}/>
            </div>
            {/* Type */}
            <div className='basis-1/7 px-4'>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select 
                className="w-full p-2 border border-white rounded-md text-white bg-transparent"
                value={predicateInfo.type}
                onChange={(e) => setPredicateInfo({ ...predicateInfo, type: e.target.value })}
                disabled={isKeyInDictionary(predicateInfo.key)}>
                <option value="string" className='text-black'>string</option>
                <option value="integer" className='text-black'>integer</option>
                <option value="boolean" className='text-black'>boolean</option>
              </select>
              {isKeyInDictionary(predicateInfo.key) && (
                <p className="text-xs text-gray-400 mt-1">Type is locked because this key already exists</p>
              )}
            </div>
             {/* Log Op */}
            <div className='basis-2/10 px-4'>
              <label className="block text-sm font-medium mb-2">Log. OP</label>
              <select
              className="w-full p-2 border border-white rounded-md text-white bg-transparent"
              value={predicateInfo.logicalOperator}
              onChange={(e) => setPredicateInfo({ ...predicateInfo, logicalOperator: e.target.value })}>
                <option value=""></option>
                <option value="OR" className='text-black'>OR</option>
                <option value="AND" className='text-black'>AND</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action input */}
        <div className={`mb-4 w-full ${nodes.length < 1 ? "hidden" : "block"} font-medium`}>
          <label className='block text-lg font-semibold mb-2 px-4'>Actions:</label>
          <div className="flex flex-row px-4">

            <div className='basis-1/3 px-4'>
              <label className="block text-sm font-medium mb-2">Key</label>
              <input
                list="action-keys"
                placeholder='Ex: freedom'
                type="text"
                className="w-full p-2 border border-white rounded-md text-white bg-transparent outline-none"
                value={actionInfo.key}
                onChange={(e) => setActionInfo({ ...actionInfo, key: e.target.value })}
              />
              <datalist id="action-keys">
                {dictionary.map((item, index) => (
                  <option key={index} value={item.key} />
                ))}
              </datalist>
              <label className='text-sm text-red-700'>Blank action = "No actions"</label>
            </div>
            
            <div className='basis-1/10 px-4'>
              <label className="block text-sm font-medium mb-2">Operator</label>
              <select
              className="w-full p-2 border border-white rounded-md text-white bg-transparent"
              value={actionInfo.operator}
              onChange={(e) => setActionInfo({ ...actionInfo, operator: e.target.value })}>
                <option value=""></option>
                <option value="=" className='text-black'>=</option>
                <option value="!=" className='text-black'>!=</option>
                <option value="<" className='text-black'>&lt;</option>
                <option value=">" className='text-black'>&gt;</option>
                <option value="<=" className='text-black'>&lt;=</option>
                <option value=">=" className='text-black'>&gt;=</option>
                <option value="+" className='text-black'>+</option>
                <option value="-" className='text-black'>-</option>
              </select>
            </div>

            <div className='basis-1/3 px-4'>
              <label className="block text-sm font-medium mb-2">Value</label>
                <input
                  placeholder='Ex: True'
                  type="text"
                  className="w-full p-2 border border-white rounded-md text-white bg-transparent outline-none"
                  value={actionInfo.value}
                  onChange={(e) => setActionInfo({ ...actionInfo, value: e.target.value })}/>
            </div>

            {/* Type */}
            <div className='basis-1/7 px-4'>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select 
                className="w-full p-2 border border-white rounded-md text-white bg-transparent"
                value={actionInfo.type}
                onChange={(e) => setActionInfo({ ...actionInfo, type: e.target.value })}
                disabled={isKeyInDictionary(actionInfo.key)}>
                <option value="string" className='text-black'>string</option>
                <option value="integer" className='text-black'>integer</option>
                <option value="boolean" className='text-black'>boolean</option>
              </select>
              {isKeyInDictionary(actionInfo.key) && (
                <p className="text-xs text-gray-400 mt-1">Type is locked because this key already exists</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex mt-8">
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