import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Dock from "../components/Dock";

import exportIcon from "../../assets/export.png";
import deleteIcon from "../../assets/delete.png";
import searchIcon from "../../assets/search.png";
import addIcon from "../../assets/add-symbol.png";
import GoToHomeModal from "../components/treePageComponents/Modals/GoToHomeModal";

function Dictionary() {
  const navigate = useNavigate();

  const { treeId, treeName } = useParams();
  const [dictionary, setDictionary] = useState([]);
  const [searchKey, setSearchKey] = useState("");

  const [showHomeModal, setShowHomeModal] = useState(false);
  

  useEffect(() => {
    async function loadStoredJson() {
      const response = await window.treeAPI.loadTree(treeId);
      console.log("Get response:", response);
      if (response) {
        setDictionary(response.dictionary);
      }
    }
    loadStoredJson();
  }, []);

  useEffect(() => {
    console.log(searchKey);
  }, [searchKey]);

  const handleConfirmGoHome = () => {
    setShowHomeModal(false);
    navigate("/");
  };

  const handleExport = async () => {
    try {
      const exportData = await window.treeAPI.exportTree(treeId);

      if (exportData) {
        // Converte o objeto para uma string JSON
        const dataStr = JSON.stringify(exportData, null, 2);

        // Cria um Blob com o conteúdo JSON
        const dataBlob = new Blob([dataStr], { type: "application/json" });

        // Cria um link para download
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${treeName}.json`; // Nome do arquivo
        link.click();

        URL.revokeObjectURL(url);
      } else {
        console.log("Error: Tree not found.");
      }
    } catch (error) {
      console.error("Erro ao exportar a árvore:", error);
    }
  };

  return (
    <>
      {showHomeModal && (
        <GoToHomeModal
          onConfirm={handleConfirmGoHome}
          onCancel={() => setShowHomeModal(false)}
        />
      )}
      <Dock currentPage={"dictionary"} treeId={treeId} treeName={treeName} onHomeClick={() => setShowHomeModal(true)}/>
      <div className="flex h-full w-full justify-center items-end bg-background-green-100">
        <div className="flex flex-col w-[60%] h-[80%] justify-between">
          <div className="flex flex-row w-full h-[12%] justify-between">
            <div className="flex flex-row w-[90%] items-center justify-around rounded-lg bg-background-green-300">
              <img
                src={searchIcon}
                alt=""
                className="w-8 h-8 object-cover ml-4"
                draggable={false}
              />
              <input
                type="text"
                value={searchKey}
                placeholder="Search Key"
                className="text-xl font-bold text-black bg-transparent w-[80%] h-full p-4"
                onChange={(e) => {
                  setSearchKey(e.target.value);
                }}
              />
              <div className="flex justify-center items-center bg-background-green-400 hover:brightness-50 duration-100 ease-in-out h-10 w-10 rounded-full cursor-pointer ">
                <img
                  src={addIcon}
                  alt=""
                  className="w-8 h-8 object-cover p-2"
                  draggable={false}
                />
              </div>
            </div>

            <button
              className="bg-background-green-400 hover:brightness-50 duration-100 ease-in-out w-[8%] rounded-lg p-6"
              onClick={handleExport}
            >
              <img src={exportIcon} alt="" draggable={false} />
            </button>
          </div>

          <div className="flex flex-row h-[80%]">
            <div className="w-full overflow-y-auto scrollbar-none rounded-t-lg border border-background-white-100 border-opacity-50">
              <table className="w-full relative">
                <thead className="uppercase rounded-t-lg bg-background-green-500 sticky top-0 z-20 w-full">
                  <tr className="w-full">
                    <th className="py-2 w-[45%] h-full">Key</th>
                    <th className="py-2 w-[45%] h-full">Type</th>
                    <th className="py-2 w-[10%] h-full"></th>
                  </tr>
                </thead>
                <tbody className="text-center w-full">
                  {dictionary
                    .filter(
                      (item) => searchKey === "" || item.key.includes(searchKey)
                    ) // Filtra apenas os itens que contêm a chave pesquisada
                    .map((item, index) => (
                      <tr
                        key={index}
                        className="font-bold w-full bg-background-green-200 hover:bg-background-green-400 hover:text-white cursor-pointer"
                      >
                        <td className="py-4 w-[45%]">{item.key}</td>
                        <td className="py-4 w-[45%]">{item.type}</td>
                        <td className="bg-red-900 hover:brightness-125 w-[10%] z-0">
                          <img
                            src={deleteIcon}
                            alt=""
                            className="w-6 justify-self-center"
                            draggable={false}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dictionary;
