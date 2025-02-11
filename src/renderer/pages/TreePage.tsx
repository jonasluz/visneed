import React from 'react';
import TreeSidebarLeft from '../components/TreeSidebarLeft';
import TreeSideBarRight from '../components/TreeSideBarRight';
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
        <TreeSidebarLeft />
      </div>

      {/* Right Sidebar (Overlay) */}
      <div className="absolute top-0 right-0 w-1/4 h-full z-10 p-4 overflow-y-auto">
        <TreeSideBarRight />
      </div>
    </div>
  );
}

export default TreePage;
