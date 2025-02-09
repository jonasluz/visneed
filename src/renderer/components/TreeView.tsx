import React, { useEffect, useRef } from 'react';
import { DataSet } from 'vis-data/esnext';
import { Network } from 'vis-network/esnext';
import 'vis-network/styles/vis-network.css'; // Importe o CSS do vis-network

function TreeView () {
  const visContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('visContainerRef:', visContainerRef.current); // Verifica se a referência existe
  
    if (!visContainerRef.current) return;
    
    const nodes = new DataSet([
      { id: 1, label: 'Node 1' },
      { id: 2, label: 'Node 2' },
    ]);
  
    const edges = new DataSet([
      {id: 1, from: 1, to: 2 },
    ]);
  
    const data = { nodes, edges };
    const options = {};
  
    const network = new Network(visContainerRef.current, data, options);
  
    return () => {
      network.destroy();
    };
  }, []);

  return (
    <div
      ref={visContainerRef}
      style={{ width: '100%', height: '100%', backgroundColor: '#1E1E1E' }}
    />
  );
};

export default TreeView;