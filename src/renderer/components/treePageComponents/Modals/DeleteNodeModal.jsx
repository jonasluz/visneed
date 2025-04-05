import React, { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';

import closeIcon from "../../../../assets/close.png";

function DeleteNodeModal({ isOpen, onClose, selectedNode, onConfirm, nodes }) {
  if (!isOpen) return null;

  const modalRef = useRef(null);

  const [noChild, setNoChild] = useState(true)
  const [choosenChildren, setChoosenChildren] = useState("")
  const [isSubstitute, setIsSubstitute] = useState(false)
  const [IsNewTree, setIsNewTree] = useState(false)
  const [type, setType] = useState("newTree")

  console.log(selectedNode.connections.length)

  useEffect(() => {
    if(selectedNode.connections.length >= 1) {
      setNoChild(true)
    } else {
      setNoChild(false)
    }
  }, [selectedNode])

  const handleConfirm = () => {
    onConfirm(selectedNode.id, type);
    onClose();
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      toast.error("Canceled!");
      onClose();
    }
  };

  return (
    <div onClick={handleClickOutside} className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div ref={modalRef} className="relative flex flex-col bg-background-green-100 w-fit h-fit p-12 rounded-lg justify-center items-center">
        <button className='absolute w-8 h-8 top-5 right-5 cursor-pointer' onClick={() => {onClose(); toast.error("Canceled!")}}>
          <img src={closeIcon} alt="" className='w-full h-full object-contain' />
        </button>
        <div className="flex flex-col w-[85%] h-fit items-center text-white">
          <h1 className='text-3xl font-rubik-bold font-bold mb-3'>Delete</h1>
          <h2 className='text-xl font-rubik-bold font-bold mb-8'>"{selectedNode.name && selectedNode.name}"</h2>
          <p className="text-lg text-center p-3 text-white">What you want to do with the leafs?</p>

          <div className="flex flex-row w-full justify-around p-6 items-center">
            <button className={`p-6 rounded-lg w-[40%] h-1/2 text-center bg-background-green-200 hover:shadow-background-green-400 hover:-translate-y-2 hover:brightness-75 duration-150 ease-in cursor-pointer text-white ${IsNewTree ? "-translate-y-2 brightness-75" : ""} border border-black`}
            onClick={() => {setIsNewTree(!IsNewTree); setIsSubstitute(false); setType("newTree")}}>
              Create a new tree
            </button>
            
            <button className={`p-6 rounded-lg w-[40%] h-1/2 text-center bg-background-green-200 hover:shadow-background-green-400 hover:-translate-y-2 hover:brightness-75 duration-150 ease-in cursor-pointer text-white ${isSubstitute ? "-translate-y-2 brightness-75" : ""} disabled:shadow-none disabled:translate-y-0 disabled:brightness-50 disabled:cursor-default border border-black`}
            onClick={() => {setIsSubstitute(!isSubstitute); setIsNewTree(false); setType("substitute")}}
            disabled={!noChild}>
              Substitute the node
            </button>

          </div>

          <div className={`flex flex-row p-6 justify-center ${isSubstitute ? "block" : "hidden"}`}>
            <p className="text-lg p-2 text-white text-nowrap">Choose the substitute:&nbsp; </p>
            <select
              className="rounded text-black w-[50%]"
              value={choosenChildren}
              onChange={(e) => setChoosenChildren(e.target.value)}>
              {selectedNode.connections.map(connection => (
                nodes.map((node) => {
                  if(node.id == connection.targetId) {
                    return (
                      <option key={node.id} value={node.id}>{node.name}</option>
                    )
                  }
                })
              ))}
            </select>
          </div>

          <div className="flex flex-row justify-around items-center w-full h-[20%]">
            <button
              className="bg-background-green-400 hover:brightness-50 duration-150 ease-in-out p-5 px-8 h-fit rounded-lg text-lg font-semibold font-rubik-semibold border border-black"
              onClick={handleConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteNodeModal;
