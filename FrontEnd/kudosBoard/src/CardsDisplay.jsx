import './CardsDisplay.css';
import {useState} from 'React';

function CardsDisplay({cardTitle, cardImgUrl, cardDescription, handleCardDelete, card}) {
  let counter = card.upVote
  const increaseUpvote = async(cardId) => {
      try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/cards/${cardId}/upVote`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json'},
          // body: JSON.stringify(cardData),
        });
        const data = await response.json();
        // setCounter(data)
        if (response.ok !== true) {
          console.log('Something went wrong.');
        }
      } catch(error) {
        console.error('Error:', error)
      }
  }

return (
  <>
      <div className="eachCard">
        <h3 className = "cardTitle">{cardTitle}</h3>
        <img className= "" src = {cardImgUrl} />
        <p>{cardDescription}</p>
        <div>
          <button className="upVoteButton" onClick={() => increaseUpvote(card.id)}>Upvote: {counter} </button>
          <button className="cardDeleteButton" onClick={() => {handleCardDelete(card.id)}}>Delete</button>
        </div>
      </div>
  </>
);
}
// onClick={increaseUpvote}

export default CardsDisplay;
