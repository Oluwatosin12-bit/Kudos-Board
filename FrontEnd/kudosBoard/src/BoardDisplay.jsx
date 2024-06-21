import './BoardDisplay.css'

function BoardDisplay({imgUrl, title, boardCategory, description, author, handleDeleteBoard, board, handleViewClick}) {
  return (
    <>
      <div className="eachBoard">
        <img className= "boardImage" src = {imgUrl} />
        <h3 className = "boardTitle">{title}</h3>
        <p className = "boardCategory">{boardCategory}</p>
        <div className = "boardButtons">
          <button onClick={() => handleViewClick(board.id)} className = "boardView">View Board</button>
          <button onClick={() => handleDeleteBoard(board.id)} className = "boardDelete">Delete Board</button>
        </div>
        <p></p>
      </div>
    </>
  );
}

export default BoardDisplay;
