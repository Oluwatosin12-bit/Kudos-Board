import "./BoardForm.css";
import { useState } from "react";

function CardForm({fetchCards, setIsCardFormOpen, id}) {
  const [cardData, setCardData] = useState({
    cardTitle: '',
    cardDescription: '',
    cardImgUrl: ``,
    cardAuthor: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCardData({...cardData, [name]: value,})
  }

  const handleSubmit = async (event, cardData) =>{
    event.preventDefault();
    try{
      const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}/cards`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(cardData),
      });
      const data = await response.json();
      console.log(data)
      if (response.ok !== true) {
        console.log('Something went wrong.');
      } else {
        fetchCards()
      }
    } catch(error) {
      console.error('Error:', error)
    }
    setIsCardFormOpen(false)
  }

  return (
    <div className="formBackground">
      <div className = "formContainer">
        <div className="xSign">
          <button className= "xButton" onClick={() => {setIsCardFormOpen(false)}}> X </button>
        </div>
        <form>
            <div>
              <label>Card Title:</label>
              <input name ="cardTitle" className = "" type="text" value = {cardData.cardTitle} onChange={handleChange} required/>
            </div>
            <div>
              <label>Description:</label>
              <textarea name="cardDescription" type="text" value = {cardData.cardDescription} onChange={handleChange} required/>
            </div>
            <div>
              <label>Card Image:</label>
              <input name ="cardImgUrl" className = "" type="text" value = {cardData.cardImgUrl} onChange={handleChange} placeholder="Search GIF..." required/>
            </div>
            <div>
              <button>Search</button>
            </div>
            <div>
              <label>Author:</label>
              <input name="cardAuthor" type="text" value = {cardData.cardAuthor} onChange={handleChange}/>
            </div>
        </form>

        <div className = "finishButtons">
          <button className = "submitButton" onClick={() => {handleSubmit(event, cardData)}}> Submit </button>
          <button className = "closeButton" onClick={() => {setIsCardFormOpen(false)}}> Cancel </button>
        </div>
      </div>
    </div>
  );
}

export default CardForm;
