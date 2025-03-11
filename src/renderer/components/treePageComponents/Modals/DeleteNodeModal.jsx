import React, { useEffect, useState } from "react";

function DeleteNodeModal({ isOpen, onClose, selectedNode, onConfirm, nodes }) {
  if (!isOpen) return null;
  console.log(selectedNode);
  console.log(nodes)

  const [onlyChild, setOnlyChild] = useState(false)
  const [choosenChildren, setChoosenChildren] = useState("")
  const [isSubstitute, setIsSubstitute] = useState(false)
  console.log(selectedNode.connections.length)
  useEffect(() => {
    if(selectedNode.connections.length > 1) {
      setOnlyChild(false)
    } else {
      setOnlyChild(true)
    }
  }, [selectedNode])

  const handleConfirm = () => {
    onConfirm(selectedNode.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="flex flex-col bg-background-green-100 w-[40%] h-[60%] p-8 rounded-lg justify-center items-center">
        <div className="flex flex-col w-[85%] h-[90%]">
          <div className="flex flex-row justify-center p-2">
            <p className="text-2xl font-rubik-semibold">You are about to deleted the node&nbsp;</p>
            <p className="text-2xl font-rubik-semibold underline underline-offset-2">
              {selectedNode.name}!
            </p>
          </div>

          <p className="text-lg text-center p-3">What you want to do with the leafs?</p>

          <div className="flex flex-row w-full h-[40%] justify-around p-6 items-center">
            <div className="p-6 rounded-lg h-[70%] w-[30%] text-center bg-background-green-200 hover:shadow-background-green-400 hover:shadow-lg duration-150 ease-in hover:-translate-y-1 cursor-pointer">
              Create a new tree
            </div>
            
            <button className={`p-6 rounded-lg h-[70%] w-[30%] text-center bg-background-green-200 hover:shadow-background-green-400 hover:shadow-lg duration-150 ease-in hover:-translate-y-1 cursor-pointer ${isSubstitute ? "shadow-lg shadow-background-green-400 -translate-y-1" : ""} disabled:shadow-none disabled:translate-y-0 disabled:brightness-50 disabled:cursor-default`}
            onClick={() => {setIsSubstitute(!isSubstitute)}}
            disabled={onlyChild}>
              Substitute the deleated node
            </button>
          </div>

          <div className={`flex flex-row p-6 justify-center ${isSubstitute ? "block" : "hidden"}`}>
            <p className="text-lg p-2">Choose the substitute:&nbsp; </p>
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
              onClick={handleConfirm}
            >
              Delete
            </button>
            <button
              className="bg-background-red-300 hover:brightness-50 duration-150 ease-in-out p-5 px-8 h-fit rounded-lg text-lg font-semibold font-rubik-semibold border border-black"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteNodeModal;
