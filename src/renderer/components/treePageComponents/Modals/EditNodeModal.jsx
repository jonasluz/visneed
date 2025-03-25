import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import closeIcon from "../../../../assets/close.png";
import EditPredicateModal from './EditModals/EditPredicateModal';
import EditActionModal from './EditModals/EditActionModal';

function EditNodeModal ({ isOpen, onClose, selectedNode, nodes, onUpdateNode }) {
  console.log(selectedNode)
  const modalRef = useRef(null);

  const [nodeName, setNodeName] = useState("");
  const [outcome, setOutcome] = useState({ key: "", operator: "", value: "" });
  const [connections, setConnections] = useState([]);
  const [predicate, setPredicate] = useState()
  const [action, setAction] = useState()

  const [isPredicateModal, setIsPredicateModal] = useState(false)
  const [isActionModal, setIsActionModal] = useState(false)

  //Setting the values
  useEffect(() => {
    if (Object.keys(selectedNode).length > 0) {
      setNodeName(selectedNode.name);
      
      if(selectedNode.outcomes === "No outcome") {
        setOutcome(selectedNode.outcomes);
      } else {
        setOutcome(selectedNode.outcomes[0]);
      }
      
      setConnections(selectedNode.connections || []);
    }
  }, [selectedNode]);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      toast.error("Canceled!");
      onClose();
    }
  };

  const openPredicateModal = (selectedPredicate) => {
    setPredicate(selectedPredicate);
    setIsPredicateModal(true);
  }

  const openActionModal = (selectedAction) => {
    setAction(selectedAction);
    setIsActionModal(true);
  }

  const handleSave = () => {
    let finalOutcome;
    if (outcome.key === "" && outcome.operator === "" && outcome.value === "") {
      finalOutcome = selectedNode.outcomes;
    } else {
      finalOutcome = [outcome];
    }
    console.log(connections)
    console.log(finalOutcome)
    const updatedNode = {
      ...selectedNode,
      name: nodeName,
      outcomes: finalOutcome,
      connections: connections
    };

    onUpdateNode(updatedNode);
    onClose();
  };

  const handleSavePredicate = (updatedPredicate) => {
    setConnections((prevConnections) =>
      prevConnections.map((conn) =>
        conn.gate.predicates === predicate ? { ...conn, gate: { ...conn.gate, predicates: updatedPredicate } } : conn
      )
    );
  };

  const handleSaveAction = (updateAction) => {
    setConnections((prevConnections) =>
      prevConnections.map((conn) =>
        conn.gate.actions === action ? { ...conn, gate: { ...conn.gate, actions: updateAction } } : conn
      )
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center" onClick={handleClickOutside}>
      <div ref={modalRef} className="relative flex flex-col justify-center items-center bg-background-green-100 w-fit h-fit p-12 rounded-lg text-white overflow-y-auto scrollbar-none" onClick={(e) => e.stopPropagation()}>
        <button className='absolute w-8 h-8 top-5 right-5 cursor-pointer' onClick={() => {onClose(); toast.error("Action canceled!")}}>
          <img src={closeIcon} alt="" className='w-full h-full object-contain' />
        </button>
        <EditPredicateModal 
          isOpen={isPredicateModal}
          onClose={() => {setIsPredicateModal(false)}}
          predicate={predicate}
          onSave={handleSavePredicate}
        />

        <EditActionModal 
          isOpen={isActionModal}
          onClose={() => {setIsActionModal(false)}}
          action={action}
          onSave={handleSaveAction}
        />

        {/* Title */}
        <h1 className='text-3xl font-rubik-bold font-bold mb-3'>Edit</h1>
        <h2 className='text-xl font-rubik-bold font-bold mb-8'>{nodeName && nodeName}</h2>
        <div className='flex flex-col w-full mb-6'>
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
                  onChange={(e) => setOutcome({ ...outcome, key: e.target.value })}
                  spellCheck={false}
                  />
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
                  onChange={(e) => setOutcome({ ...outcome, value: e.target.value })}
                  spellCheck={false}
                  />
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
                {console.log(connections)}
                {connections.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="px-4 py-4 text-center">No connections</td>
                  </tr>
                ) : connections.map((connection, index) => (
                  <tr key={index} className="font-bold text-center">
                    <td className="px-4 py-4">{nodes[connection.targetId - 1]?.name || "Unknown"}</td>
                    <td className="px-4 py-4">
                      <button className='bg-background-green-500 p-3 px-4 rounded-lg hover:brightness-75 duration-75 ease-linear' onClick={() => {openPredicateModal(connection.gate.predicates)}}>
                        Edit
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <button className='bg-background-green-500 p-3 px-4 rounded-lg hover:brightness-75 duration-75 ease-linear' onClick={() => {openActionModal(connection.actions)}}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <button className='p-3 px-10 bg-background-green-500 rounded-lg text-lg hover:brightness-75 duration-75 ease-linear' onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
}

export default EditNodeModal;