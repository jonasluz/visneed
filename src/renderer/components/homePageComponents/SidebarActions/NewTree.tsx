import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import addIcon from "../../../../assets/add-symbol.png";

function NewTree() {
  const navigate = useNavigate();
  const [treeName, setTreeName] = useState("");

  const handleClick = async () => {
    if (!treeName.trim()) {
      alert("Por favor, insira um nome para a árvore.");
      return;
    }

    const treeId = await window.treeAPI.createTree(treeName);
    navigate(`/tree-view/${treeId}`);
  };

  return (
    <div className="flex flex-col h-[25%] p-5 mx-10">
      <p className="text-white font-semibold text-2xl mb-5">Create a new tree:</p>
      <div className="flex flex-row">
        <input
          type="text"
          placeholder="Tree name"
          value={treeName}
          onChange={(e) => setTreeName(e.target.value)}
          className="border p-3 rounded-lg text-black outline-none"
        />
        <button
          onClick={handleClick}
          className="flex flex-row bg-background-green-300 hover:brightness-50 duration-150 ease-in-out p-3 rounded-2xl ml-5 items-center outline-none"
        >
          <img src={addIcon} alt="" className="object-cover w-4 h-4 mr-2" />
          <p className="text-lg font-semibold">Tree</p>
        </button>
      </div>
    </div>
  );
}

export default NewTree;
