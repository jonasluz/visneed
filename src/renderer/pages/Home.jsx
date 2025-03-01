import React, { useEffect, useState } from "react";
import Sidebar from "../components/homePageComponents/Sidebar";
import MyTree from "../components/homePageComponents/MyTree";

function Home() {

  const [trees, setTrees] = useState([]);

  useEffect(() => {
    const fetchTrees = async () => {
      try {
        const response = await window.treeAPI.getSavedTrees();
        setTrees(response);
        
      } catch (error) {
        console.error("Erro ao buscar as árvores salvas:", error);
      }
    };

    fetchTrees();
  }, []);

  return (
    <div className="flex flex-row bg-background-green-100 h-screen items-center">
      <div className="flex flex-col relative w-[16%] h-[95%] ml-5 shadow-sm p-5">
        <p className='text-2xl font-semibold text-white font-rubik-semibold'>VisNeed</p>
        <Sidebar />
      </div>
      <div className="flex flex-col w-5/6 h-[95%]">
        <MyTree trees={trees}/>
      </div>
    </div>
  );
}

export default Home;
