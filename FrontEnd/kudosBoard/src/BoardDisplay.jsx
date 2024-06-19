import './BoardDisplay.css'
import {useState} from 'react';

function BoardDisplay({imgUrl, title, boardCategory, description, author, handleDeleteBoard, board}) {


  return (
    <>
        <div className="eachBoard">
          <img className= "boardImage" src = {imgUrl} />
          <h3 className = "boardTitle">{title}</h3>
          <p className = "boardCategory">{boardCategory}</p>
          <p className = "boardDescription">{description}</p>
          <p className = "boardAuthor">{author}</p>
          <div className = "boardButtons">
            <button className = "boardView">View Board</button>
            <button onClick={() => handleDeleteBoard(board.id)} className = "boardDelete">Delete Board</button>
          </div>
          <p></p>
        </div>
    </>
  );
}

export default BoardDisplay;