import React from "react";

function Connections({ connections }) {
  return (
    <div className="w-full h-full overflow-y-auto">
      {connections.length > 0 ? (
        connections.map((element, index) => (
          <p
            key={index}
            className="text-white py-3 px-5 my-2 hover:bg-background-green-400 rounded-lg cursor-pointer"
          >
            {element.label}
          </p>
        ))
      ) : (
        <p className="text-white py-3 px-5 my-2">Nenhuma conexão</p>
      )}
    </div>
  );
}

export default Connections;
