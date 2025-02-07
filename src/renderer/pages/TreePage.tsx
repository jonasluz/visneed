import React from 'react';
import TreeSidebar from '../components/TreeSidebar';
import NewTree from '../components/NewTree';

function TreePage() {
  return (
    <div className="flex flex-row bg-background-black-100 min-h-screen">
      <div className="w-1/6 h-screen">
        <TreeSidebar />
      </div>
      <div className="flex flex-col w-5/6">
        
      </div>
    </div>
  );
}

export default TreePage;
