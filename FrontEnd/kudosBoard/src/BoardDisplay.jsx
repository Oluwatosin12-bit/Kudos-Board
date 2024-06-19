import './BoardDisplay.css'
import {useState} from 'react';

function BoardDisplay({imgUrl, title, boardCategory, description, author, board}) {
  //handle board addition modal
  const [isBoardOpen, setIsBoardOpen] = useState(false);
  const handleOpenBoard = () => {
    setIsBoardOpen(!isBoardOpen);
  }
    return (
      <>
          <div className="eachBoard">
            <img className= "boardImage" src = {imgUrl} />
            <h3 className = "boardTitle">{title}</h3>
            <p className = "boardCategory">{boardCategory}</p>
            <p className = "boardDescription">{description}</p>
            <p className = "boardAuthor">{author}</p>
            <div className = "boardButtons">
              <button  onClick={handleOpenBoard} className = "boardView">View Board</button>
              <button className = "boardDelete">Delete Board</button>
            </div>
            <p></p>
          </div>
      </>
    );
}

export default BoardDisplay;
