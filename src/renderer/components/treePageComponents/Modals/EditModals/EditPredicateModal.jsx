import React, { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import closeIcon from "../../../../../assets/close.png";

function EditPredicateModal ({ isOpen, onClose, predicate, onSave }) {
  const modalRef = useRef(null);

  const [predicateInfo, setPredicateInfo] = useState(predicate || {});

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if(predicate) {
        setPredicateInfo(predicate[0]);
    }
  }, [predicate])

  const handleSave = () => {
    onSave([predicateInfo]);
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
        {console.log(predicateInfo)}
        <h1 className='text-3xl font-rubik-bold font-bold mb-10'>Edit predicate</h1>
        <div className='flex flex-col w-full mb-6'>
          <div className={`mb-4 w-full font-medium`}>
            <div className="flex flex-row px-4">
              {/* Key */}
              <div className='basis-1/3 px-4'>
              <label className="block text-sm font-medium mb-2">Key</label>
              <input
                  type="text"
                  className="w-full p-2 border border-white rounded-md text-white bg-transparent"
                  value={predicateInfo.key}
                  onChange={(e) => setPredicateInfo({ ...predicateInfo, key: e.target.value })}
                  spellCheck={false}/>
              </div>
              {/* Condition */}
              <div className='basis-1/10 px-4'>
              <label className="block text-sm font-medium mb-2">Condition</label>
              <select
              className="w-full p-2 border border-white rounded-md text-white bg-transparent"
              value={predicateInfo.condition}
              onChange={(e) => setPredicateInfo({ ...predicateInfo, condition: e.target.value })}>
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
                className="w-full p-2 border border-white rounded-md text-white bg-transparent"
                value={predicateInfo.value}
                onChange={(e) => setPredicateInfo({ ...predicateInfo, value: e.target.value })}/>
              </div>
              {/* Log Op */}
              <div className='basis-2/10 px-4'>
                <label className="block text-sm font-medium mb-2">Log. OP</label>
                <select
                className="w-full p-2 border border-white rounded-md text-white bg-transparent"
                value={predicateInfo.logicalOperator}
                onChange={(e) => setPredicateInfo({ ...predicateInfo, logicalOperator: e.target.value })}>
                    <option value="OR" className='text-black'>OR</option>
                    <option value="AND" className='text-black'>AND</option>
                </select>
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

export default EditPredicateModal;