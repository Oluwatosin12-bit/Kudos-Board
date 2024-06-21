import "./BoardForm.css";
import { useState, useEffect } from "react";

function CommentsView({setIsCommentSectionOpen, id}) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async() =>{
      try{
        const commentsList = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/cards/${id}/comments`);
        const commentsData = await commentsList.json();
        setComments(commentsData)
      } catch(error){
        console.error('Error:', error);
      }
    };
    fetchComments();
  }, [id])

  const comment = comments.map((comment) => (
    <div className="commentBlock" key={comment.id}>
      <h3>{comment.name}</h3>
      <p>{comment.comment}</p>
    </div>
  ))

  return (
    <div className="formBackground">
      <div className = "formContainer">
        <div className="xSign">
          <button className= "xButton" onClick={() => {setIsCommentSectionOpen(false)}}> X </button>
        </div>
        <div>
          {comment}
        </div>
        <div className = "finishButtons">
          <button className = "closeButton" onClick={() => {setIsCommentSectionOpen(false)}}> Close comments</button>
        </div>
      </div>
    </div>
  );
}

export default CommentsView;
