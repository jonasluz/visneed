import React, { useState } from 'react';
import TreeSidebarLeft from '../components/TreeSidebarLeft';
import TreeSideBarRight from '../components/TreeSideBarRight';
import TreeView from '../components/TreeView';

function TreePage() {
  const [tree, setTree] = useState({
    nodesArray: [
      { id: 1, label: "Node 1" },
      { id: 2, label: "Node 2" },
      { id: 3, label: "Node 3" },
      { id: 4, label: "Node 4" },
      { id: 5, label: "Node 5" },
    ],
    edgesArray: [
      { from: 1, to: 3 },
      { from: 1, to: 2 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
    ],
  });

  const handleImport = (data) => {
    setTree({
      nodesArray: data.nodes,
      edgesArray: data.edges,
    });
  };

  return (
    <div className="relative w-full h-screen bg-background-black-100">
      {/* Conteúdo central */}
      <div className="w-full h-full flex justify-center items-center ">
        <TreeView nodesArray={tree.nodesArray} edgesArray={tree.edgesArray}/>
      </div>

      {/* Left Sidebar (Overlay) */}
      <div className="absolute top-0 left-0 w-1/6 h-full z-10">
        <TreeSidebarLeft onImport={handleImport}/>
      </div>

      {/* Right Sidebar (Overlay) */}
      <div className="absolute top-0 right-0 w-1/4 h-full z-10 p-4 overflow-y-auto">
        <TreeSideBarRight />
      </div>
    </div>
  );
}

export default TreePage;
