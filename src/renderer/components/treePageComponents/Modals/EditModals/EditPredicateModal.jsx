import React, { useEffect, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

import closeIcon from "../../../../../assets/close.png";
import addIcon from "../../../../../assets/add-symbol-2.png";
import deleteIcon from "../../../../../assets/delete.png";

function EditPredicateModal({ isOpen, onClose, targetId, predicate, onSave }) {
  const modalRef = useRef(null);
  const [predicates, setPredicates] = useState([]);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (predicate && predicate !== "No predicates") {
      setPredicates([...predicate]);
    } else {
      setPredicates([{ key: '', condition: '', value: '', logicalOperator: '' }]);
    }
  }, [predicate]);

  const handleSave = () => {
    // Filtra predicates vazios
    const validPredicates = predicates.filter(p => 
      p.key && p.condition && p.value
    );
    
    onSave(validPredicates.length > 0 ? validPredicates : "No predicates");
    onClose();
  };

  const handlePredicateChange = (index, field, value) => {
    const updatedPredicates = [...predicates];
    updatedPredicates[index] = {
      ...updatedPredicates[index],
      [field]: value
    };
    setPredicates(updatedPredicates);
  };

  const addNewPredicate = () => {
    setPredicates([
      ...predicates,
      { key: '', condition: '', value: '', logicalOperator: '' }
    ]);
  };

  const removePredicate = (index) => {
    const updatedPredicates = predicates.filter((_, i) => i !== index);
    setPredicates(updatedPredicates.length > 0 ? updatedPredicates : [{ key: '', condition: '', value: '', logicalOperator: '' }]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center" onClick={handleClickOutside}>
      <div ref={modalRef} className="relative flex flex-col bg-background-green-100 w-3/5 max-h-[80vh] p-8 rounded-lg text-white" onClick={(e) => e.stopPropagation()}>
        <button className='absolute w-8 h-8 top-5 right-5 cursor-pointer' onClick={onClose}>
          <img src={closeIcon} alt="" className='w-full h-full object-contain' />
        </button>
        
        <h1 className='text-3xl font-rubik-bold font-bold mb-6'>Edit predicates</h1>
        
        <div className='flex flex-col w-full mb-6 overflow-y-auto'>
          {predicates.map((pred, index) => (
            <div key={index} className="mb-4 p-4 border border-background-green-300 rounded-lg">
              <div className="flex flex-row items-center mb-2">
                <h2 className="text-lg font-medium">Predicate #{index + 1}</h2>
                {predicates.length > 1 && (
                  <button 
                    className="ml-auto p-1 hover:brightness-75"
                    onClick={() => removePredicate(index)}
                  >
                    <img src={deleteIcon} alt="Remove" className="w-5 h-5 invert" />
                  </button>
                )}
              </div>
              
              <div className="flex flex-row px-4">
                {/* Key */}
                <div className='basis-1/3 px-4'>
                  <label className="block text-sm font-medium mb-2">Key</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-white rounded-md text-white bg-transparent outline-none"
                    value={pred.key}
                    onChange={(e) => handlePredicateChange(index, 'key', e.target.value)}
                    spellCheck={false}
                  />
                </div>
                
                {/* Condition */}
                <div className='basis-1/10 px-4'>
                  <label className="block text-sm font-medium mb-2">Condition</label>
                  <select
                    className="w-full p-2 border border-white rounded-md text-white bg-transparent"
                    value={pred.condition}
                    onChange={(e) => handlePredicateChange(index, 'condition', e.target.value)}
                  >
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
                    value={pred.value}
                    onChange={(e) => handlePredicateChange(index, 'value', e.target.value)}
                  />
                </div>
                
                {/* Log Op */}
                <div className='basis-2/10 px-4'>
                  <label className="block text-sm font-medium mb-2">Log. OP</label>
                  <select
                    className="w-full p-2 border border-white rounded-md text-white bg-transparent"
                    value={pred.logicalOperator}
                    onChange={(e) => handlePredicateChange(index, 'logicalOperator', e.target.value)}
                  >
                    <option value=""></option>
                    <option value="OR" className='text-black'>OR</option>
                    <option value="AND" className='text-black'>AND</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mt-4">
          <button 
            className="flex items-center p-2 px-4 bg-background-green-400 rounded-lg hover:brightness-75"
            onClick={addNewPredicate}
          >
            <img src={addIcon} alt="Add" className="w-5 h-5 invert mr-2" />
            Add Predicate
          </button>
          
          <button 
            className="p-3 px-10 bg-background-green-500 rounded-lg text-lg hover:brightness-75 duration-75 ease-linear" 
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditPredicateModal;