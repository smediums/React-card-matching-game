import { useEffect, useState } from "react";
import "./App.scss";
import helmet from "./images/helmet-1.png";
import shield from "./images/shield-1.png";
import ring from "./images/ring-1.png";
import sword from "./images/sword-1.png";
import scroll from "./images/scroll-1.png";
import potion from "./images/potion-1.png";
import cover from "./images/cover.png";
import Card from "./components/Card";

const cardImgs = [
  { src: helmet, matched: false },
  { src: shield, matched: false },
  { src: ring, matched: false },
  { src: sword, matched: false },
  { src: scroll, matched: false },
  { src: potion, matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  // Shuffle
  const shuffle = () => {
    const hasShuffled = [...cardImgs, ...cardImgs]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(hasShuffled);
    setTurns(0);
  };

  useEffect(() => {
    setCards(shuffle);
  }, []);

  // User choice
  const handleChoice = (card) => {
    // check if first or second choice
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Check if cards match
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceTwo.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurns();
      } else {
        setTimeout(() => {
          resetTurns();
        }, 700);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Reset choices and increase turn count
  const resetTurns = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffle}>New Game</button>

      <div className="gameGrid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            cover={cover}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disable={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
