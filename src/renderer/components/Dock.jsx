import React from "react";
import houseIcon from '../../assets/home.png'
import dictionaryIcon from '../../assets/dictionary.png'
import treeIcon from '../../assets/decision-tree-image.png'
import cenarioIcon from '../../assets/cenario.png'
import { useNavigate } from "react-router-dom";

function Dock({currentPage, treeId, treeName, onHomeClick }) {
  const navigate = useNavigate();

  const handleClickDock = (page) => {
    switch(page) {
      case 'home':
        onHomeClick(); 
        break;
      case 'dictionary':
        navigate(`/dictionary/${treeId}/${treeName}`);
        break;
      case 'treePage':
        if (treeId) {
          navigate(`/tree-view/${treeId}`); 
        }
        break;
      case 'cenario':
        navigate(`/cenario/${treeId}/${treeName}`);
        break;
    }
  };

  return (
    <div className='flex flex-row justify-around absolute bottom-0 z-40 left-1/2 transform -translate-x-1/2 -translate-y-1/2 right- w-[17%] h-[8%] bg-background-green-200 rounded-lg p-2 border items-center'>
        <div
        className='xl:w-10 xl:h-10 2xl:w-14 2xl:h-14 p-3 hover:bg-background-green-400 duration-100 ease-in rounded-lg cursor-pointer'
        onClick={() => {handleClickDock('home')}}>
          <img src={houseIcon} alt="" draggable={false}/>
        </div>
        
        <div 
        className={`xl:w-10 xl:h-10 2xl:w-14 2xl:h-14 p-3 hover:bg-background-green-400 ${currentPage == 'dictionary' ? 'bg-background-green-400' : ''} duration-100 ease-in rounded-lg cursor-pointer`}
        onClick={() => {handleClickDock('dictionary')}}>
          <img src={dictionaryIcon} alt="" draggable={false}/>
        </div>
        
        <div 
        className={`xl:w-10 xl:h-10 2xl:w-14 2xl:h-14 p-3 hover:bg-background-green-400 ${currentPage == 'treePage' ? 'bg-background-green-400' : ''} duration-100 ease-in rounded-lg cursor-pointer`}
        onClick={() => {handleClickDock('treePage')}}>
          <img src={treeIcon} alt="" draggable={false}/>
        </div>
        
        <div
        className='xl:w-10 xl:h-10 2xl:w-14 2xl:h-14 p-3 hover:bg-background-green-400 duration-100 ease-in rounded-lg cursor-pointer'
        onClick={() => {handleClickDock('cenario')}}>
          <img src={cenarioIcon} alt="" draggable={false}/>
        </div>
        
    </div>
  )
}

export default Dock