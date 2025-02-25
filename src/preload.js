const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("treeAPI", {
  createTree: (treeName) => ipcRenderer.invoke("create-tree", treeName),
  saveTree: (treeName, data) => ipcRenderer.invoke("save-tree", treeName, data),
  loadTree: (treeId) => ipcRenderer.invoke("load-tree", treeId),
  getSavedTrees: () => ipcRenderer.invoke("list-tree"),
});
