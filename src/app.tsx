import * as React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/tailwind.css'

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
      <>
        <h2 className='text-blue-500'>Hello from React!</h2>
      </>
    
  );
}