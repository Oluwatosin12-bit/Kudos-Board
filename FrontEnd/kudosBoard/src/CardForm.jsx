import "./CardForm.css";
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
    if (cardData.cardTitle === '' || cardData.cardImgUrl === ''){
      alert('Please fill in required fields')
    } else {
      try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${id}/cards`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(cardData),
        });
        const data = await response.json();s
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
  }

  return (
    <div className="cardFormBackground">
      <div className = "cardFormContainer">
        <div className="xSign">
          <button className= "xButton" onClick={() => {setIsCardFormOpen(false)}}> X </button>
        </div>
        <form>
            <div className="cardTitleSection">
              <label className="cardTitleLabel">Card Title: <span className="compulsoryField">*</span></label>
              <input name ="cardTitle" className = "" type="text" value = {cardData.cardTitle} onChange={handleChange} required/>
            </div>
            <div className="cardDescriptionSection">
              <label className="cardDescriptionLabel">Description:</label>
              <textarea name="cardDescription" type="text" value = {cardData.cardDescription} onChange={handleChange} required/>
            </div>
            <div className="cardImageSection">
              <label className="cardImageLabel">Card Image: <span className="compulsoryField">*</span></label>
              <input name ="cardImgUrl" className = "" type="text" value = {cardData.cardImgUrl} onChange={handleChange} placeholder="Search GIF..." required/>
            </div>
            <div className="cardImageSearch">
              <button>Search</button>
            </div>
            <div className="cardAuthorSection">
              <label className="cardAuthorLabel">Author:</label>
              <input name="cardAuthor" type="text" value = {cardData.cardAuthor} onChange={handleChange}/>
            </div>
        </form>

        <div className = "finishButtons">
          <button className = "submitButton" onClick={() => {handleSubmit(event, cardData)}}> Submit </button>
          <button className = "closeButton" onClick={() => {setIsCardFormOpen(false)}}> Close </button>
        </div>
      </div>
    </div>
  );
}

export default CardForm;
