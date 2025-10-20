import React, { useRef, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewElementModal({ isOpen, onClose, dictionary, onSave }) {
  const modalRef = useRef(null);

  const [selectedKey, setSelectedKey] = useState("");
  const [value, setValue] = useState("");
  const [inputType, setInputType] = useState("text");

  useEffect(() => {
    // Reset form quando o modal abre
    if (isOpen) {
      setSelectedKey("");
      setValue("");
      setInputType("text");
    }
  }, [isOpen]);

  useEffect(() => {
    // Quando a chave selecionada muda, atualize o tipo de input
    if (selectedKey) {
      const selectedItem = dictionary.find(item => item.key === selectedKey);
      if (selectedItem) {
        switch(selectedItem.type) {
          case 'integer':
            setInputType('number');
            setValue(0); // Valor padrão para números
            break;
          case 'boolean':
            setInputType('checkbox');
            setValue(false); // Valor padrão para booleanos
            break;
          default:
            setInputType('text');
            setValue(""); // Valor padrão para strings
        }
      }
    }
  }, [selectedKey, dictionary]);

  const handleConfirm = () => {
    if (!selectedKey) {
      toast.error("Select key!");
      return;
    }
  
    const selectedItem = dictionary.find(item => item.key === selectedKey);
    let finalValue = value;
  
    // Conversão de tipos
    if (selectedItem) {
      switch(selectedItem.type) {
        case 'integer':
          finalValue = parseInt(value) || 0;
          break;
        case 'boolean':
          finalValue = Boolean(value);
          break;
        default:
          finalValue = String(value);
      }
    }
  
    onSave({
      key: selectedKey,
      value: finalValue
    });
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  const handleCheckboxChange = (e) => {
    setValue(e.target.checked);
  };

  if (!isOpen) return null;

  return (
    <div className="flex justify-center items-center fixed inset-0 z-50 bg-black bg-opacity-50" onClick={handleClickOutside}>
      <div ref={modalRef} className="relative bg-background-green-100 w-fit h-fit p-12 rounded-lg text-white overflow-y-auto scrollbar-none" onClick={(e) => e.stopPropagation()}>
        <div className='flex justify-center'>
          <h2 className="text-3xl font-rubik-bold font-bold mb-8">Add New Element</h2>
        </div>

        <div className="mb-6 px-4 font-medium">
          <label className="block mb-2">Select Key</label>
          <select
            className="w-full p-2 border border-white rounded-md text-white bg-transparent mb-4 text-black"
            value={selectedKey}
            onChange={(e) => setSelectedKey(e.target.value)}
          >
            <option value="">Select a key</option>
            {dictionary.map((item, index) => (
              <option key={index} value={item.key} className="text-black">
                {item.key} ({item.type})
              </option>
            ))}
          </select>

          <label className="block mb-2">Value</label>
          {inputType === 'checkbox' ? (
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={!!value}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <span>{String(value)}</span>
            </div>
          ) : (
            <input
              type={inputType}
              className="w-full p-2 border border-white rounded-md text-white bg-transparent outline-none text-black"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={`Enter ${selectedKey ? dictionary.find(item => item.key === selectedKey)?.type : 'value'}`}
            />
          )}
        </div>
        
        <div className="flex justify-center mt-8 gap-4">
          <button
            className="bg-gray-500 hover:brightness-50 ease-in-out duration-100 text-white text-sm p-4 px-8 rounded font-semibold font-rubik-semibold"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-background-green-400 hover:brightness-50 ease-in-out duration-100 text-white text-sm p-4 px-8 rounded font-semibold font-rubik-semibold"
            onClick={handleConfirm}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewElementModal;