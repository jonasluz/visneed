import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import NewTree from "../components/NewTree";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [trees, setTrees] = useState([]);

  const handleClickTree = (treeId) => {
    console.log(treeId)
    navigate(`/tree-view/${treeId}`);
  }

  useEffect(() => {
    const fetchTrees = async () => {
      try {
        const response = await window.treeAPI.getSavedTrees();
        console.log(response)
        setTrees(response);
      } catch (error) {
        console.error("Erro ao buscar as árvores salvas:", error);
      }
    };

    fetchTrees();
  }, []);

  return (
    <div className="flex flex-row bg-background-green-100 min-h-screen">
      <div className="w-1/6 h-screen">
        <Sidebar />
      </div>
      <div className="flex flex-col w-5/6">
        <NewTree />
        <div className="flex flex-col border h-full items-center">
          {trees.map((tree, key) => {
            return (
              <button 
              key={key}
              className="w-[80%] border "
              onClick={() => {handleClickTree(tree.id)}}>
                {tree.name}
              </button>
            )
          })

          }
        </div>
      </div>
    </div>
  );
}

export default Home;
