import React from "react";
import User from "./User";
function TreeSidebarLeft({ onImport }) {
  const handleFile = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        console.log(content)
        try {
          const data = JSON.parse(content);
          onImport(data);
        } catch (error) {
          alert("Erro ao ler o arquivo JSON.");
          console.log(error)
        }
      };
      reader.readAsText(file);
    }
  }

  return (
    <div className="flex flex-col bg-background-green-200 w-full h-full bg-opacity-70">
      <div className="flex flex-row w-full h-[15%] items-center justify-around">
        <p className="text-3xl font-bold text-white">Vis Need</p>
      </div>
      <div className="flex flex-col h-[45%] p-4 border-b">
        <h1 className="text-xl font-bold text-white">Nodes</h1>
      </div>
      <div className="flex flex-col h-[30%] p-4 border-b">
        <h1 className="text-xl font-bold text-white">Connections</h1>
      </div>
      <div className="flex flex-col h-[10%] justify-center p-6">
      <input
          type="file"
          accept=".json"
          onChange={handleFile}
          style={{ display: "none" }}
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="bg-background-green-400 p-2 rounded-lg cursor-pointer"
        >
          <p className="text-lg font-semibold">Import</p>
        </label>
      </div>
    </div>
  );
}

export default TreeSidebarLeft;