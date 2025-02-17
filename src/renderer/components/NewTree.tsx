import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import addIcon from "../../assets/add-symbol.png";

function NewTree() {
  const navigate = useNavigate();
  const [treeName, setTreeName] = useState("");

  const handleClick = async  () => {
    if (!treeName.trim()) {
      alert("Por favor, insira um nome para a árvore.");
      return;
    }

    const treeId = await window.treeAPI.createTree(treeName);
    navigate(`/tree-view/${treeId}`);
  };

  return (
    <div className="flex h-[25%] items-center">
      <input
        type="text"
        placeholder="Tree name"
        value={treeName}
        onChange={(e) => setTreeName(e.target.value)}
        className="border p-3 rounded-lg ml-5 "
      />
      <button
        onClick={handleClick}
        className="flex flex-row bg-background-green-300 p-3 rounded-2xl ml-5 items-center"
      >
        <img src={addIcon} alt="" className="object-cover w-4 h-4 mr-2" />
        <p className="text-lg font-semibold">Tree</p>
      </button>
    </div>
  );
}

export default NewTree;
