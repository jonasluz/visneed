import React, { useEffect, useState } from 'react'
import User from './User' 
import deleteIcon from '../../../assets/delete.png'
import addIcon from '../../../assets/add-symbol-2.png'
import homeIcon from '../../../assets/home.png'

function Sidebar() {
  const [deleteSelected, setDeleteSelected] = useState(false)
  const [addSelected, setAddSelected] = useState(false)
  const [homeSelected, setHomeSelected] = useState(false)

  const handleActive = (actionSelected: string) => {
    switch(actionSelected) {
      case 'delete':   
        setDeleteSelected(!deleteSelected);
        setAddSelected(false)
        setHomeSelected(false)
        break;
      case 'add':
        setAddSelected(!addSelected);
        setDeleteSelected(false)
        setHomeSelected(false)
        break;
      case 'home': 
        setHomeSelected(!homeSelected);
        setAddSelected(false)
        setDeleteSelected(false)
    }
  }

  return (
    <div className='relative flex flex-col w-full h-[90%] py-4'>
        {/* Home */}
        <div 
        className={`flex flex-row w-full h-10 mb-3 text-sm rounded-lg ${homeSelected ? 'bg-background-green-200 shadow-xl' : 'bg-opacity-0 hover:bg-opacity-15 hover:bg-white'} items-center duration-100 ease-in  cursor-pointer`}
        onClick={() => {handleActive('home')}}>
          <img src={homeIcon} alt="" className='self-center object-cover p-2 h-full invert' />
          <p className='text font-rubik-semibold font-semibold tracking-normal text-white'>Home</p>
        </div>

        {/* Create a new project */}
        <div 
        className={`flex flex-row w-full h-10 mb-3 text-sm rounded-lg ${addSelected ? 'bg-background-green-200 shadow-xl' : 'bg-opacity-0 hover:bg-opacity-15 hover:bg-white'} items-center duration-100 ease-in  cursor-pointer`}
        onClick={() => {handleActive('add')}}>
          <img src={addIcon} alt="" className='self-center object-cover p-2 h-full invert' />
          <p className='text font-rubik-semibold font-semibold tracking-normal text-white'>New project</p>
        </div>

        {/* Delete the project */}
        <div 
        className={`flex flex-row w-full h-10 mb-3 text-sm rounded-lg ${deleteSelected ? 'bg-background-green-200 shadow-xl' : 'bg-opacity-0 hover:bg-opacity-15 hover:bg-white'} items-center duration-100 ease-in  cursor-pointer`}
        onClick={() => {handleActive('delete')}}>
          <img src={deleteIcon} alt="" className='self-center object-cover p-2 h-full invert' />
          <p className='text font-rubik-semibold font-semibold tracking-normal text-white'>Delete project</p>
        </div>
        {/* <User /> */}
    </div>
  )
}

export default Sidebar