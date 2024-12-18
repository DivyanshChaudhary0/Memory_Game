
import React, { useState } from 'react'

const Box = ({item,index}) => {
   const [val,setVal] = useState(true);

  return (
    <div className="w-[250px] h-36 flex-shrink-0 bg-black rounded cursor-pointer overflow-hidden" onClick={()=>setVal(!val)}>
        {
          val ? <div className='w-full h-full rounded bg-white flex items-center justify-center text-5xl'>#</div> : 
          <div id={index} className='w-full h-full flex items-center justify-center text-5xl'>{item}</div>
        }
    </div>
  )
}

export default Box;