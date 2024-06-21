import "./CardForm.css";
import { useState } from "react";

function CardForm({fetchCards, setIsCardFormOpen, id}) {
  const [gifList, setGifList] = useState([]);
  const [selectedGIF, setSelectedGIF] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [cardData, setCardData] = useState({
    cardTitle: '',
    cardDescription: '',
    cardImgUrl: '',
    cardAuthor: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cardImgUrl'){
      setSelectedGIF(e.target.value)
      setCardData({...cardData, [name]: selectedGIF})
    } else{
    setCardData({...cardData, [name]: value,})
    }
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
        const data = await response.json();
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

  const handleSearchGIF = async(event, searchQuery) => {
    event.preventDefault();
    if (searchQuery === '') return
    try{
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=${searchQuery}&limit=5`);
      const data = await response.json();
      setGifList(data.data)
    } catch(error) {
      console.error('Error:', error)
    }
  }

  const handleSearchQueryChange = (event) =>{
    setSearchQuery(event.target.value)
  }

  const handleSelectedGIF = (gifUrl) => {
    setSelectedGIF(gifUrl)
    setGifList([])
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
              <input className = "" type="text" value = {searchQuery} onChange={() =>handleSearchQueryChange(event)} placeholder="Search GIF..." required/>
            </div>
            <div className="cardImageSearch">
              <button onClick={() => handleSearchGIF(event, searchQuery)}>Search</button>
            </div>
            <div className="">
              {gifList.map((gif) =>(
                <img
                key={gif.id}
                src={gif.images.fixed_height_small.url}
                alt={gif.title}
                onClick={() => {handleSelectedGIF(gif.images.fixed_height_small.url)}}
                />
              ))}
            </div>
            <div className="">
              <input name="cardImgUrl" type="text" value = {cardData.cardImgUrl = selectedGIF} onChange={handleChange}/>
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
