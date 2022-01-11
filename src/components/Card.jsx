import React from "react";

const Card = ({ card, cover, handleChoice, flipped, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="Front of card" />
        <img
          className="back"
          src={cover}
          alt="cover of card"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Card;
