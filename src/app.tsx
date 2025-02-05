import * as React from 'react';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
      <>
        <h2>Hello from React!</h2>
      </>
    
  );
}