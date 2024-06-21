import { useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import CardsDisplay from './CardsDisplay';
import CardForm from './CardForm';
import './CardsPage.css'
import CommentsForm from './CommentsForm';
import CommentsView from './CommentsView';

function CardsPage() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [isCardForm, setIsCardForm] = useState(false);
  const [isCommentForm, setIsCommentForm] = useState(false);
  const [isCommentSection, setIsCommentSection] = useState(false);
  const [currentCardId, setCurrentCardId] = useState(-1);
  const handleCardForm = () => {
    setIsCardForm(!isCardForm);
  }
  const closeCardForm = () => {
    setIsCardForm(false);
  };

  const handleOpenCommentForm= (cardId) => {
    setIsCommentForm(!isCommentForm);
    setCurrentCardId(cardId)
  }
  const closeCommentForm = () => {
    setIsCommentForm(false);
  };

  const handleOpenCommentSection= (cardId) => {
    setIsCommentSection(!isCommentSection);
    setCurrentCardId(cardId)
  }
  const closeCommentSection = () => {
    setIsCommentSection(false);
  };

  const fetchCards = async() => {
    try{
      const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}/cards`);
      const data = await response.json();
      setCards(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  useEffect(() =>{
    fetchCards();
  })

  const handleCardDelete = async (cardId) => {
    try{
      const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/cards/${cardId}`, {
        method: 'DELETE',
      });
      if(response.ok === true){
        setCards(cards.filter(card => card.id !== cardId))
      } else {
        console.error('Error deleting board');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const cardElements = cards.map(card => {
      return(
        <>
          <CardsDisplay
          cardTitle = {card.cardTitle}
          cardImgUrl = {card.cardImgUrl}
          cardDescription = {card.cardDescription}
          card={card}
          cards={cards}
          handleCardDelete={handleCardDelete}
          handleOpenCommentForm={handleOpenCommentForm}
          handleOpenCommentSection={handleOpenCommentSection}
          isCommentForm={isCommentForm}
          closeCommentForm={closeCommentForm}
          isCommentSection={isCommentSection}
          closeCommentSection={closeCommentSection}
          />
        </>
      )
  })

  return (
    <>
      <button onClick={() => navigate(-1)}> ⬅ </button>
      <div className="cardsContainer">
          <div className="createCardButton">
            <button onClick={handleCardForm}>Create Card</button>
          </div>
          <div className="cardsDisplay">
            {cardElements}
          </div>

          {isCardForm == true && (
            <CardForm setIsCardFormOpen={closeCardForm} id={id} fetchCards={fetchCards}/>
          )}

          {isCommentForm == true && (
            <CommentsForm setIsCommentFormOpen = {closeCommentForm} id={currentCardId}/>
          )}

          {isCommentSection == true && (
              <CommentsView setIsCommentSectionOpen = {closeCommentSection} id={currentCardId}/>
          )}
      </div>

    </>
  );
}

export default CardsPage;
