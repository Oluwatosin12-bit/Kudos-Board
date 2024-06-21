import './CardsDisplay.css';
import CommentsForm from './CommentsForm';
import CommentsView from './CommentsView';

function CardsDisplay({cardTitle,
  cardImgUrl, cardDescription, handleCardDelete, card, handleOpenCommentForm,
  handleOpenCommentSection,isCommentForm, closeCommentForm, isCommentSection, closeCommentSection, cards}) {

  const increaseUpvote = async(cardId) => {
    console.log(cardId)
      try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/cards/${cardId}/upVote`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json'},
        });
        const data = await response.json();
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
          <button className="upVoteButton" onClick={() => {increaseUpvote(card.id)}}>Upvote: {card.upVote} </button>
          <button className="cardDeleteButton" onClick={() => {handleCardDelete(card.id)}}>Delete</button>
        </div>

        <div>
          <button className="addCommentButton" onClick={() => handleOpenCommentForm(card.id)}>Add comment</button>
          <button className="commentViewButton" onClick={() => handleOpenCommentSection(card.id)}>💬</button>
        </div>


      </div>
  </>
);
}

export default CardsDisplay;
