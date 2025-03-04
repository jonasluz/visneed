import React from "react";
import { HashRouter  as Router, Routes, Route } from "react-router-dom";
import Home from "./renderer/pages/Home";
import Dictionary from "./renderer/pages/Dictionary";
import TreePage from "./renderer/pages/TreePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tree-view/:treeId" element={<TreePage />} /> 
        <Route path="/dictionary/:treeId/:treeName" element={<Dictionary />}/>
      </Routes>
    </Router>
  );
}

export default App;
