import { useState } from 'react';

function CardsDisplay({cardTitle, cardImgUrl, cardDescription, handleCardDelete, card}) {
  const [counter, setCounter] = useState(0);
  const increaseUpvote = () => {
    setCounter(counter + 1);
  }
  return (
    <>
        <div className="">
          <h3 className = "">{cardTitle}</h3>
          <img className= "" src = {cardImgUrl} />
          <p>{cardDescription}</p>
          <button onClick={increaseUpvote}>Upvote: {counter} </button>
          <button onClick={() => {handleCardDelete(card.id)}}>Delete</button>
        </div>
    </>
  );
}

export default CardsDisplay;
