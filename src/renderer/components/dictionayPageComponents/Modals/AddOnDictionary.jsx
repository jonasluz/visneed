import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddOnDictionary ({ isOpen, onClose, onConfirm }) {
  const modalRef = useRef(null);

  const [newDictionaryElement, setNewDictionaryElement] = useState({
        key: '',
        type: 'string'
      });

  if (!isOpen) return null;

  const handleConfirm = () => {
    if(newDictionaryElement.key == '') {
      toast.error("An element is empty!")
    } else {
      onConfirm(newDictionaryElement);
      onClose();
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      toast.error("Canceled!");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center" onClick={handleClickOutside}>
      <div ref={modalRef} className="relative flex flex-col justify-center items-center bg-background-green-100 w-1/2 h-fit p-12 rounded-lg text-white overflow-y-auto scrollbar-none" onClick={(e) => e.stopPropagation()}>
        {/* Title */}
        <h1 className='text-3xl font-rubik-bold font-bold mb-10'>Dictionary</h1>
        <div className={`mb-4 w-full font-medium`}>
          <label className='block text-lg font-semibold mb-2'>New element:</label>
          <div className="flex flex-row px-4">
            {/* Key */}
            <div className='basis-2/3 px-4'>
              <label className="block text-sm font-medium mb-2">Key</label>
              <input
                placeholder='Ex: Option'
                type="text"
                className="w-full p-2 border border-white rounded-md text-white bg-transparent outline-none"
                value={newDictionaryElement.key}
                onChange={(e) => setNewDictionaryElement({ ...newDictionaryElement, key: e.target.value })}
              />
            </div>
            
            {/* Type */}
            <div className='basis-1/3 px-4'>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select className="w-full p-2 border border-white rounded-md text-white bg-transparent"
                value={newDictionaryElement.type}
                onChange={(e) => setNewDictionaryElement({ ...newDictionaryElement, type: e.target.value })}>
                <option value="string" className='text-black'>string</option>
                <option value="integer" className='text-black'>integer</option>
                <option value="boolean" className='text-black'>boolean</option>
              </select>
            </div>
            
          </div>
        </div>
        <button className='p-3 px-10 mt-6 bg-background-green-500 rounded-lg text-lg hover:brightness-75 duration-75 ease-linear' onClick={handleConfirm}>
            Create
        </button>
      </div>
    </div>
  );
}

export default AddOnDictionary;