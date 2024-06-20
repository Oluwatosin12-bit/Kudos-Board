import "./BoardForm.css";
import { useState } from "react";

function BoardForm({setIsBoardFormOpen, randomNumber, fetchBoards}) {
  const BoardOptions = [
    {id: 'all', label: 'All'},
    {id: 'recent', label: 'Recent'},
    {id: 'celebration', label: 'Celebration'},
    {id: 'thankYou', label: 'Thank You'},
    {id: 'inspiration', label: 'Inspiration'},
  ]

  const [formData, setFormData] = useState({
    imgUrl: `https://picsum.photos/200/300?random=${randomNumber}`,
    title: '',
    boardCategory: '',
    description: '',
    author: '',
  });

  // to handle/update form entry values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value,})
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    if  (formData.title === '' || formData.description === "") {
      alert('Please fill out required fields.');
    } else {
      try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(formData),
        });
        if (!response.ok) {
          console.log('Something went wrong.');
        } else {
          console.log('Kudo submitted successfully!');
          fetchBoards()
        }
      } catch(error) {
        console.error('Error:', error)
      }
      setIsBoardFormOpen(false)
    }

  }

  return (
    <div className="formBackground">
      <div className = "formContainer">
        <div className="xSign">
          <button className= "xButton" onClick={() => {setIsBoardFormOpen(false)}}> X </button>
        </div>
        <form>
            <div className="boardTitleSection">
              <label className="boardTitleLabel">Title: <span className="compulsoryField">*</span></label>
              <input name ="title" className = "" type="text" value={formData.title} onChange={handleChange}/>
            </div>
            <div className = "boardOptions">
              <label className="boardCategoryLabel">Category:</label>
              <select type="text" name ="boardCategory" value={formData.boardCategory} onChange={handleChange}>
                {BoardOptions.map(({id, label}) =>
                <option
                name = "boardCategory"
                value = {label}
                key={id}
                className="boardCategory">
                {label}
                 </option>
                )}
              </select>
            </div>
            <div className="boardDescriptionSection">
              <label className="boardDescriptionLabel">Description: <span className="compulsoryField">*</span></label>
              <textarea name="description" type="text" value={formData.description} onChange={handleChange}/>
            </div>
            <div className="boardAuthorSection">
              <label className="boardAuthorLabel">Author:</label>
              <input name="author" type="text" value={formData.author} onChange={handleChange}/>
            </div>
        </form>

        <div className = "finishButtons">
          <button className = "submitButton" onClick={handleSubmit}> Submit </button>
          <button className = "closeButton" onClick={() => {setIsBoardFormOpen(false)}}> Close </button>
        </div>
      </div>
    </div>
  );
}

export default BoardForm;
