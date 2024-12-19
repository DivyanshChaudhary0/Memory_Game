import React, { useState, useEffect } from "react";

const MobileGame = () => {

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

  const shuffledImages = shuffleArray(emojis);  //suffle emojies
  console.log(shuffledImages);
  

  const [cards, setCards] = useState(
    shuffledImages.map((image, index) => ({
      id: index,
      image,
      isFlipped: false,
      isMatched: false,
    }))
  );

  const [won,setWon] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [clickCount, setClickCount] = useState(0);

  const handleCardClick = (id) => {
    const clickedCard = cards.find((card) => card.id === id);

    if (clickedCard.isMatched || clickedCard.isFlipped || selectedCards.length === 2) return;

    setClickCount((prevCount) => prevCount + 1);

    const updatedCards = cards.map(
      (card) => (card.id === id ? { ...card, isFlipped: true } : card) // this is for flipping cards that changing false to true
    );
    setCards(updatedCards);

    const newSelectedCards = [...selectedCards, clickedCard];
    setSelectedCards(newSelectedCards);

    if (newSelectedCards.length === 2) {
      const [first, second] = newSelectedCards;
      if (first.image === second.image) {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.filter((card) => card.image !== first.image)
          );
        }, 500);
        setScore((prevScore) => prevScore + 1);
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === first.id || card.id === second.id
                ? { ...card, isFlipped: false }
                : card
            )
          );
        }, 1000);
      }

      setSelectedCards([]);
    }
  };

  // Reset the game when all cards are matched
  useEffect(() => {
    if (cards.length === 0) {
        setWon(true);

      setCards(
        shuffledImages.map((image, index) => ({
          id: index,
          image,
          isFlipped: false,
          isMatched: false,
        }))
      );
      setScore(0);
      setClickCount(0); // Reset click count
    }
  }, [cards, shuffledImages, clickCount]); // here i used dependency array when it has to render the cards

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <p className="text-lg font-medium text-gray-700 mb-4">Score: {score}</p>
      <p className="text-lg font-medium text-gray-700 mb-4">
        Clicks Taken: {clickCount}
      </p>
      {won ? <div className="text-3xl font-semibold text-green-500"> You Won the match </div> : 
      <div className="grid grid-cols-4 gap-4 mt-3">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className={`w-[250px] h-[150px] flex gap-10 items-center justify-center rounded shadow-lg cursor-pointer transition-transform duration-300 ${
              card.isFlipped ? "bg-white" : "bg-black"
            }`}
          >
            {card.isFlipped ? (
              <div className='w-full h-full flex items-center justify-center text-5xl'>{card.image}</div>
            ) : (
              <div className="text-white text-xl font-bold">~</div>
            )}
          </div>
        ))}
      </div>}
      {won && <button onClick={()=>setWon(false)} className="px-4 py-2 bg-black text-white rounded mt-6">Restart Game</button> }
    </div>
  );
};

export default MobileGame;