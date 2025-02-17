import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import NewTree from "../components/NewTree";

function Home() {
  const [trees, setTrees] = useState([]);

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
        <ul>
          {trees.map((tree) => {
            return (
              <li>{tree.id}</li>
            )
          })

          }
        </ul>
      </div>
    </div>
  );
}

export default Home;
