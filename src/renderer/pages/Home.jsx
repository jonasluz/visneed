import React, { useEffect, useState, lazy, Suspense } from "react";
import Sidebar from "../components/homePageComponents/Sidebar";
const MyTree = lazy(() => import("../components/homePageComponents/SidebarActions/MyTree"));

import Loader from '../components/Loaders/TreeLoader'
import NewTree from "../components/homePageComponents/SidebarActions/NewTree";
import DeleteTree from "../components/homePageComponents/SidebarActions/DeleteTree";

function Home() {

  const [selectedTab, setSelectedTab] = useState("home");
  const [trees, setTrees] = useState([]);

  useEffect(() => {
    if(selectedTab == 'home') { //Evitar ficar carregando as arvores ao trocar de tab
      const fetchTrees = async () => {
        try {
          const response = await window.treeAPI.getSavedTrees();
          setTrees(response);
          
        } catch (error) {
          console.error("Erro ao buscar as árvores salvas:", error);
        }
      };
      fetchTrees();
    }
   
  }, [selectedTab]);

  const getContent = () => {
    switch (selectedTab) {
      case "home":
        return (
          <Suspense fallback={<Loader className='absolute top-0 left-0 w-full h-full border-4 border-white'/>}>
            <MyTree trees={trees} />
          </Suspense>
        );
      case "add":
        return (
          <Suspense fallback={<Loader className='absolute top-0 left-0 w-full h-full border-4 border-white'/>}>
            <NewTree />
          </Suspense>
        );
      case "delete":
          return (
            <Suspense fallback={<Loader className='absolute top-0 left-0 w-full h-full border-4 border-white'/>}>
              <DeleteTree trees={trees}/>
            </Suspense>
          )
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-row bg-background-green-100 h-screen items-center">
      <div className="flex flex-col relative w-[16%] h-[95%] ml-5 shadow-sm p-5">
        <p className='text-2xl font-semibold text-white font-rubik-semibold'>VisNeed</p>
        <Sidebar setSelectedTab={setSelectedTab} selectedTab={selectedTab} />
      </div>
      <div className={`flex flex-col w-5/6 h-[95%]`}>
        {getContent()}
      </div>
    </div>
  );
}

export default Home;
