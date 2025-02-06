import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tailwind.css'
import Sidebar from './renderer/components/Sidebar';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
      <div className='bg-background-green-100 min-h-screen'>
        <Sidebar />
      </div>
    
  );
}