import React from 'react'
import houseIcon from '../../assets/home.png'
import dictionaryIcon from '../../assets/dictionary.png'
import treeIcon from '../../assets/decision-tree-image.png'
import cenarioIcon from '../../assets/cenario.png'

function Dock() {
  return (
    <div className='flex flex-row justify-around absolute bottom-0 z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2 right- w-[20%] h-[8%] bg-background-green-200 rounded-lg p-2 border items-center'>
        <img src={houseIcon} alt="" className='w-10 h-10 p-2 hover:bg-background-green-400 duration-100 ease-in rounded-lg cursor-pointer'/>
        <img src={dictionaryIcon} alt="" className='w-10 h-10 p-2 hover:bg-background-green-400 duration-100 ease-in rounded-lg cursor-pointer'/>
        <img src={treeIcon} alt="" className='w-10 h-10 p-2 hover:bg-background-green-400 duration-100 ease-in rounded-lg cursor-pointer'/>
        <img src={cenarioIcon} alt="" className='w-10 h-10 p-2 hover:bg-background-green-400 duration-100 ease-in rounded-lg cursor-pointer'/>
    </div>
  )
}

export default Dock