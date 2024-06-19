import { useEffect, useState } from "react"
import BoardCategories from "./BoardCategories"
import BoardDisplay from "./BoardDisplay"
import SearchBoards from "./SearchBoards"
import BoardForm from "./BoardForm"

function App() {
  const [boards, setBoards] = useState([]);
  const [randomNumber, setRandomNumber] = useState(0);

  //handles board addition modal
  const [isBoardForm, setIsBoardForm] = useState(false);
  const handleBoardForm = () => {
    setIsBoardForm(!isBoardForm);
    setRandomNumber(Math.floor(Math.random() * 100));
  }
  const closeBoardForm = () => {
    setIsBoardForm(false);
  };

  useEffect(() => {
    fetchBoards();
  }, [])

  const fetchBoards = () => {
    fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      setBoards(data);
    })
    .catch(error => {
      console.error("Error:", error);
    })
  }

  const handleDeleteBoard = async (boardId) => {
    try{
      const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/${boardId}`, {
        method: 'DELETE',
      });
      if(response.ok === true){
        setBoards(boards.filter(board => board.id !== boardId))
      } else {
        console.error('Error deleting board');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const board = boards.map(board => {
    return(
      <>
        <BoardDisplay
        imgUrl = {board.imgUrl}
        title = {board.title}
        boardCategory = {board.boardCategory}
        description = {board.description}
        author = {board.author}
        handleDeleteBoard={handleDeleteBoard}
        board={board}/>
      </>
    )
  })


  return (
    <>
      <SearchBoards handleBoardForm = {handleBoardForm}/>
      <BoardCategories />
      <div className="boardDisplay">
        {board}
      </div>

      {isBoardForm == true && (
        <BoardForm setIsBoardFormOpen = {closeBoardForm} randomNumber={randomNumber} fetchBoards={fetchBoards}/>
      )}
    </>
  )
}

export default App;
