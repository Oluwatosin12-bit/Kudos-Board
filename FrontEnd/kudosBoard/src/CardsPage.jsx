import { useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect } from 'react';
import CardsDisplay from './CardsDisplay';
import CardForm from './CardForm';
import './CardsPage.css'


function CardsPage() {
  let navigate = useNavigate();
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const [isCardForm, setIsCardForm] = useState(false);
  const handleCardForm = () => {
    setIsCardForm(!isCardForm);
  }
  const closeCardForm = () => {
    setIsCardForm(false);
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

  const card = cards.map(card => {
      return(
        <>
          <CardsDisplay
          cardTitle = {card.cardTitle}
          cardImgUrl = {card.cardImgUrl}
          cardDescription = {card.cardDescription}
          card={card}
          handleCardDelete={handleCardDelete}/>
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
            {card}
          </div>

          {isCardForm == true && (
            <CardForm setIsCardFormOpen={closeCardForm} id={id} fetchCards={fetchCards}/>
          )}
      </div>

    </>
  );
}

export default CardsPage;
