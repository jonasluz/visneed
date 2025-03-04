import React, { useEffect, useState } from 'react'
import deleteIcon from '../../../assets/delete.png'
import addIcon from '../../../assets/add-symbol-2.png'
import homeIcon from '../../../assets/home.png'

interface SidebarProps {
  setSelectedTab: (tab: string) => void;
  selectedTab: string;
}

const Sidebar = React.memo(({ setSelectedTab, selectedTab }: SidebarProps) => { 
  return (
    <div className='relative flex flex-col w-full h-auto py-4 border-b'>
        {/* Home */}
        <div 
        className={`flex flex-row w-full h-10 mb-3 text-sm rounded-lg ${selectedTab === "home" ? 'bg-background-green-200 shadow-xl' : 'bg-opacity-0 hover:bg-opacity-15 hover:bg-white'} items-center duration-100 ease-in  cursor-pointer`}
        onClick={() => setSelectedTab("home")}>
          <img src={homeIcon} alt="" className='self-center object-cover p-2 h-full invert' />
          <p className='text font-rubik-semibold font-semibold tracking-normal text-white'>Home</p>
        </div>

        {/* Create a new project */}
        <div 
        className={`flex flex-row w-full h-10 mb-3 text-sm rounded-lg ${selectedTab === "add" ? 'bg-background-green-200 shadow-xl' : 'bg-opacity-0 hover:bg-opacity-15 hover:bg-white'} items-center duration-100 ease-in  cursor-pointer`}
        onClick={() => setSelectedTab("add")}>
          <img src={addIcon} alt="" className='self-center object-cover p-2 h-full invert' />
          <p className='text font-rubik-semibold font-semibold tracking-normal text-white'>New project</p>
        </div>

        {/* Delete the project */}
        <div 
        className={`flex flex-row w-full h-10 mb-3 text-sm rounded-lg ${selectedTab === "delete" ? 'bg-background-green-200 shadow-xl' : 'bg-opacity-0 hover:bg-opacity-15 hover:bg-white'} items-center duration-100 ease-in  cursor-pointer`}
        onClick={() => setSelectedTab("delete")}>
          <img src={deleteIcon} alt="" className='self-center object-cover p-2 h-full invert' />
          <p className='text font-rubik-semibold font-semibold tracking-normal text-white'>Delete project</p>
        </div>
    </div>
  )
})

export default Sidebar