import React, { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import closeIcon from "../../../../../assets/close.png";

function EditActionModal ({ isOpen, onClose, action, onSave }) {
  const modalRef = useRef(null);

  const [actionInfo, setActionInfo] = useState(action || {});

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if(action && action != "No action") {
        setActionInfo(action[0]);
    }
  }, [action])

  const handleSave = () => {
    onSave([actionInfo]);
    console.log(actionInfo)
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center" onClick={handleClickOutside}>
      <div ref={modalRef} className="relative flex flex-col justify-center items-center bg-background-green-100 w-fit h-fit p-12 rounded-lg text-white overflow-y-auto scrollbar-none" onClick={(e) => e.stopPropagation()}>
        <button className='absolute w-8 h-8 top-5 right-5 cursor-pointer' onClick={() => {onClose()}}>
          <img src={closeIcon} alt="" className='w-full h-full object-contain' />
        </button>
        {/* Title */}
        {console.log(actionInfo)}
        <h1 className='text-3xl font-rubik-bold font-bold mb-10'>Edit actions</h1>
        <div className='flex flex-col w-full mb-6'>
          <div className={`mb-4 w-full font-medium`}>
            <div className="flex flex-row px-4">
              {/* Key */}
              <div className='basis-1/3 px-4'>
              <label className="block text-sm font-medium mb-2">Key</label>
              <input
                  type="text"
                  className="w-full p-2 border border-white rounded-md text-white bg-transparent outline-none"
                  value={actionInfo.key}
                  onChange={(e) => setActionInfo({ ...actionInfo, key: e.target.value })}
                  spellCheck={false}/>
              </div>
              {/* Operator */}
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
              </select>
              </div>
              {/* Value */}
              <div className='basis-1/3 px-4'>
                <label className="block text-sm font-medium mb-2">Value</label>
                <input
                type="text"
                className="w-full p-2 border border-white rounded-md text-white bg-transparent outline-none"
                value={actionInfo.value}
                onChange={(e) => setActionInfo({ ...actionInfo, value: e.target.value })}/>
              </div>
            </div>
          </div>
        </div>
        <button className='p-3 px-10 bg-background-green-500 rounded-lg text-lg hover:brightness-75 duration-75 ease-linear' onClick={handleSave}>
            Ok
        </button>
      </div>
    </div>
  );
}

export default EditActionModal;