import React from 'react';
import TreeSidebar from '../components/TreeSidebar';
import TreeView from '../components/TreeView';

function TreePage() {
  return (
    <div className="relative w-full h-screen bg-background-black-100">
      {/* Conteúdo central */}
      <div className="w-full h-full flex justify-center items-center ">
        <TreeView />
      </div>

      {/* Left Sidebar (Overlay) */}
      <div className="absolute top-0 left-0 w-1/6 h-full z-10">
        <TreeSidebar />
      </div>

      {/* Right Sidebar (Overlay) */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-opacity-80 z-10 p-4">
        <div className="h-[10%] opacity-70 flex justify-center">
          <button className="bg-background-green-200 rounded-lg w-full h-full">
            <p className="text-2xl text-white font-semibold">Export Data</p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TreePage;
