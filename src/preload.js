const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  saveJson: (data) => ipcRenderer.invoke("save-json", data),
  loadJson: () => ipcRenderer.invoke("load-json"),
});

contextBridge.exposeInMainWorld("treeAPI", {
  createTree: (treeName) => ipcRenderer.invoke("create-tree", treeName),
  saveTree: (treeName, data) => ipcRenderer.invoke("save-tree", treeName, data),
  loadTree: (treeName) => ipcRenderer.invoke("load-tree", treeName),
  getSavedTrees: () => ipcRenderer.invoke("list-tree"),
});
