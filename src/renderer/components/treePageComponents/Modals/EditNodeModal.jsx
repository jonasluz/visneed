import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import closeIcon from "../../../../assets/close.png";

function EditNodeModal ({ isOpen, onClose, selectedNode }) {
  console.log(selectedNode)
  const modalRef = useRef(null);

  const [outcome, setOutcome] = useState("");
  
  useEffect(() => {
    if(Object.keys(selectedNode).length > 0) {
      setOutcome(selectedNode?.outcomes[0])
    }
  }, [selectedNode])

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      toast.error("Action canceled!");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center" onClick={handleClickOutside}>
      <div ref={modalRef} className="relative flex flex-col justify-center items-center bg-background-green-100 w-fit h-fit p-12 rounded-lg text-white overflow-y-auto scrollbar-none" onClick={(e) => e.stopPropagation()}>
      <button className='absolute w-8 h-8 top-5 right-5 cursor-pointer' onClick={() => {onClose(); toast.error("Action canceled!")}}>
        <img src={closeIcon} alt="" className='w-full h-full object-contain' />
      </button>
        <h1 className='text-3xl font-rubik-bold font-bold mb-6'>{selectedNode && selectedNode.name}</h1>
        <div className='flex flex-row'>
          <div className={`mb-4 w-full font-medium`}>
            <label className='block text-lg font-semibold mb-2 px-4'>Outcomes:</label>
            <div className="flex flex-row px-4">
              <div className='basis-1/3 px-4'>
                <label className="block text-sm font-medium mb-2">Key</label>
                <input
                  type="text"
                  className="w-full p-2 border border-white rounded-md text-white bg-transparent"
                  value={outcome.key}
                  onChange={(e) => setOutcome({ ...outcome, key: e.target.value })}/>
              </div>
              <div className='basis-1/10 px-4'>
                <label className="block text-sm font-medium mb-2">Operator</label>
                <select
                className="w-full p-2 border border-white rounded-md text-white bg-transparent accent-transparent"
                value={outcome.operator}
                onChange={(e) => setOutcome({ ...outcome, operator: e.target.value })}>
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
                  type="text"
                  className="w-full p-2 border border-white rounded-md text-white bg-transparent"
                  value={outcome.value}
                  onChange={(e) => setOutcome({ ...outcome, value: e.target.value })}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditNodeModal;