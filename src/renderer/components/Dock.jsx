import React, { useEffect } from 'react'
import houseIcon from '../../assets/home.png'
import dictionaryIcon from '../../assets/dictionary.png'
import treeIcon from '../../assets/decision-tree-image.png'
import cenarioIcon from '../../assets/cenario.png'
import { useNavigate } from "react-router-dom";

function Dock({currentPage, treeId, treeName}) {
  const navigate = useNavigate();

  const handleClickDock = (page) => {
    switch(page) {
      case 'home':
        navigate('/');
        break;
      case 'dictionary':
        navigate(`/dictionary/${treeId}/${treeName}`);
        break;
      case 'treePage':
        if (treeId) {
          navigate(`/tree-view/${treeId}`); 
        }
        break;
    }
  };

  return (
    <div className='flex flex-row justify-around absolute bottom-0 z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2 right- w-[17%] h-[8%] bg-background-green-200 rounded-lg p-2 border items-center'>
        <div
        className='w-10 h-10 p-2 hover:bg-background-green-400 duration-100 ease-in rounded-lg cursor-pointer'
        onClick={() => {handleClickDock('home')}}>
          <img src={houseIcon} alt="" draggable={false}/>
        </div>
        
        <div 
        className={`w-10 h-10 p-2 hover:bg-background-green-400 ${currentPage == 'dictionary' ? 'bg-background-green-400' : ''} duration-100 ease-in rounded-lg cursor-pointer`}
        onClick={() => {handleClickDock('dictionary')}}>
          <img src={dictionaryIcon} alt="" draggable={false}/>
        </div>
        
        <div 
        className={`w-10 h-10 p-2 hover:bg-background-green-400 ${currentPage == 'treePage' ? 'bg-background-green-400' : ''} duration-100 ease-in rounded-lg cursor-pointer`}
        onClick={() => {handleClickDock('treePage')}}>
          <img src={treeIcon} alt="" draggable={false}/>
        </div>
        
        <div
        className='w-10 h-10 p-2 hover:bg-background-green-400 duration-100 ease-in rounded-lg cursor-pointer'
        onClick={handleClickDock}>
          <img src={cenarioIcon} alt="" draggable={false}/>
        </div>
        
    </div>
  )
}

export default Dock