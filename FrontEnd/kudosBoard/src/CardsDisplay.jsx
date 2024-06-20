import { useState } from 'react';
import './CardsDisplay.css';

function CardsDisplay({cardTitle, cardImgUrl, cardDescription, handleCardDelete, card}) {
  const [counter, setCounter] = useState(0);
  const increaseUpvote = () => {
    setCounter(counter + 1);
  }
  return (
    <>
        <div className="eachCard">
          <h3 className = "cardTitle">{cardTitle}</h3>
          <img className= "" src = {cardImgUrl} />
          <p>{cardDescription}</p>
          <div>
            <button className="upVoteButton" onClick={increaseUpvote}>Upvote: {counter} </button>
            <button className="cardDeleteButton" onClick={() => {handleCardDelete(card.id)}}>Delete</button>
          </div>
        </div>
    </>
  );
}

export default CardsDisplay;
