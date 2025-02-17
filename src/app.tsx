import React from "react";
import { HashRouter  as Router, Routes, Route } from "react-router-dom";
import Home from "./renderer/pages/Home";
import TreeView from "./renderer/pages/TreePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tree-view/:treeId" element={<TreeView />} /> 
      </Routes>
    </Router>
  );
}

export default App;
