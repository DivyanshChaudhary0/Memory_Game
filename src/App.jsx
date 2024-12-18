
import { useEffect, useState } from "react";
import Box from "./Components/Box";
import MobileGame from "./Components/MobileGame";

function App() {

  const emojis = [
    "🍎",
    "🍎",
    "🍌",
    "🍌",
    "🍇",
    "🍇",
    "🍉",
    "🍉",
    "🍒",
    "🍒",
    "🍓",
    "🍓",
  ];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // Pick a random index from 0 to i
      const randomIndex = Math.floor(Math.random() * (i + 1));
  
      // Swap elements at i and randomIndex
      const temp = array[i];
      array[i] = array[randomIndex];
      array[randomIndex] = temp;
    }
    return array;
  }

  const [emoji,setEmoji] = useState([]);

  useEffect(function(){
    shuffleArray(emojis);
    setEmoji(emojis);
  },[]);

  console.log(emoji);

  return (
    // <div className="w-full min-h-screen bg-slate-300 py-6">
    //   <div className="text-center text-4xl font-extralight">MEMORY GAME</div>
    //   <div className="w-[80%] mx-auto py-4 flex items-center justify-center gap-4 flex-wrap">
    //     {emoji.map((item,index)=>(
    //       <Box key={index} item={item} index={index} />
    //     ))}
    //   </div>

    //   <div className="w-[68%] mt-4 mx-auto h-32 bg-white rounded flex gap-20 items-center px-36 ">
    //     <div className="moves">
    //       <p className="text-4xl font-medium">Moves: <span>0</span></p>
    //     </div>
    //     <div className="misses">
    //       <p className="text-4xl font-medium">Misses: <span>0</span></p>
    //     </div>
    //   </div>
    // </div>
    <MobileGame/>
  );
}

export default App;