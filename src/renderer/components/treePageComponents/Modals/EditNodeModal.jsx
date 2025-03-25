import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import closeIcon from "../../../../assets/close.png";

function EditNodeModal ({ isOpen, onClose, selectedNode, edges, nodes }) {
  const modalRef = useRef(null);

  const [outcome, setOutcome] = useState("");
  const [nodeName, setNodeName] = useState("");
  const [connections, setConnections] = useState([]);

  useEffect(() => {
    if(Object.keys(selectedNode).length > 0) {
      setOutcome(selectedNode?.outcomes[0]);
      setNodeName(selectedNode?.name);
      setConnections(selectedNode?.connections)
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
        {/* Title */}
        <h1 className='text-3xl font-rubik-bold font-bold mb-6'>{nodeName && nodeName}</h1>
        <div className='flex flex-col w-full'>
          {/* Node name */}
          <div className="flex w-full mb-6 px-4 font-medium items-center">
            <label className="block text-lg font-semibold font-rubik-semibold text-nowrap mr-4">Name:</label>
            <input
              type="text"
              className="w-full p-2 border border-white rounded-md text-white bg-transparent"
              value={nodeName}
              onChange={(e) => setNodeName(e.target.value)}
              spellCheck={false}
              />
          </div>

          {/* Outcomes */}
          <div className={`mb-6 w-full font-medium`}>
            <label className='block text-lg font-semibold font-rubik-semibold mb-2 px-4'>Outcomes:</label>
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

          {/* Connections */}
          <div className='w-full'>
            <label className='block text-lg font-semibold font-rubik-semibold mb-2 px-4'>Connections:</label>
            <div className='w-full rounded-lg overflow-hidden text-black'>
              <table className='w-full text-left'>
                <thead className='uppercase'>
                  <tr className='bg-background-green-300 text-center'>
                    <th scope="col" className="px-4 py-2 w-1/3">Target</th>
                    <th scope="col" className="px-4 py-2 w-1/3">Predicate</th>
                    <th scope="col" className="px-4 py-2 w-1/3">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-background-green-400 h-2/6">
                {connections.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-4 py-4 text-center">No connections</td>
                  </tr>
                ) : connections.map((connection, index) => (
                  <tr key={index} className="font-bold text-center">
                    <td className="px-4 py-4">{nodes[connection.targetId - 1]?.name || "Unknown"}</td>
                    <td className="px-4 py-4">
                      <button className='bg-background-green-500 p-3 px-4 rounded-lg hover:brightness-75 duration-75 ease-linear'>
                        Edit
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <button className='bg-background-green-500 p-3 px-4 rounded-lg hover:brightness-75 duration-75 ease-linear'>
                        Edite
                      </button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditNodeModal;