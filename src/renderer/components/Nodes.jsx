import React from 'react'

function Nodes({ nodes }) {
  return (
    <div className='w-full h-full overflow-y-auto'>
      {nodes.map((element, index) => {
        return (
          <p className='text-white py-3 px-5 my-2 hover:bg-background-green-400 rounded-lg cursor-pointer' key={index}>{element.label}</p>
        )
      })}
    </div>
  )
}

export default Nodes