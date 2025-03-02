import React from 'react'
import houseIcon from '../../assets/home.png'
import dictionaryIcon from '../../assets/dictionary.png'
import treeIcon from '../../assets/decision-tree-image.png'
import cenarioIcon from '../../assets/cenario.png'
import { useNavigate } from "react-router-dom";

function Dock() {
  const navigate = useNavigate();

  const handleClickDock = () => {
    console.log("asd")
    navigate(`/dictionary`);
  };

  return (
    <div className='flex flex-row justify-around absolute bottom-0 z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2 right- w-[17%] h-[8%] bg-background-green-200 rounded-lg p-2 border items-center'>
        <div
        className='w-10 h-10 p-2 hover:bg-background-green-400 duration-100 ease-in rounded-lg cursor-pointer'
        onClick={handleClickDock}>
          <img src={houseIcon} alt=""/>
        </div>
        
        <div 
        className='w-10 h-10 p-2 hover:bg-background-green-400 duration-100 ease-in rounded-lg cursor-pointer'
        onClick={handleClickDock}>
          <img src={dictionaryIcon} alt="" />
        </div>
        
        <div 
        className='w-10 h-10 p-2 hover:bg-background-green-400 duration-100 ease-in rounded-lg cursor-pointer'
        onClick={handleClickDock}>
          <img src={treeIcon} alt="" />
        </div>
        
        <div
        className='w-10 h-10 p-2 hover:bg-background-green-400 duration-100 ease-in rounded-lg cursor-pointer'
        onClick={handleClickDock}>
          <img src={cenarioIcon} alt=""/>
        </div>
        
    </div>
  )
}

export default Dock