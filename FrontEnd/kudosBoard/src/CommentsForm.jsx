import "./BoardForm.css";
import { useState } from "react";

function CommentsForm({setIsCommentFormOpen, id}) {
    const [commentData, setCommentData] = useState({
        name: '',
        comment: '',
    });

      // to handle/update form entry values
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCommentData({...commentData, [name]: value,})
    }

  const handleSubmit = async (event, commentData, id) =>{
    event.preventDefault();
    if  (commentData.name === '' || commentData.comment === "") {
      alert('Please fill out required fields.');
    } else {
      try{
        const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/cards/${id}/comments`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify((commentData)),
        });
        const newComment = await response.json();
        console.log(newComment);
        if (!response.ok) {
          console.log('Something went wrong.');
        }
      } catch(error) {
        console.error('Error:', error)
      }
      setIsCommentFormOpen(false)
    }
  }

  return (
    <div className="formBackground">
      <div className = "formContainer">
        <div className="xSign">
          <button className= "xButton" onClick={() => {setIsCommentFormOpen(false)}}> X </button>
        </div>
        <form>
            <div className="boardTitleSection">
              <label className="boardTitleLabel">Name: <span className="compulsoryField">*</span></label>
              <input name ="name" className = "" value={commentData.name} type="text" onChange={handleChange}/>
            </div>
            <div className="boardDescriptionSection">
              <label className="boardDescriptionLabel">Comment: <span className="compulsoryField">*</span></label>
              <textarea name="comment" type="text" value={commentData.comment} onChange={handleChange}/>
            </div>
        </form>

        <div className = "finishButtons">
          <button className = "submitButton" onClick={() => {handleSubmit(event, commentData, id)}}> Submit </button>
          <button className = "closeButton" onClick={() => {setIsCommentFormOpen(false)}}> Close </button>
        </div>
      </div>
    </div>
  );
}

export default CommentsForm;
