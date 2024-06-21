import { useEffect, useState } from "react"
import  { useNavigate } from "react-router-dom"
import BoardCategories from "./BoardCategories"
import BoardDisplay from "./BoardDisplay"
import SearchBoards from "./SearchBoards"
import BoardForm from "./BoardForm"

function BoardsPage() {
  const [boards, setBoards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [recentBoards, isSetRecentBoards] = useState(false)
  const [randomNumber, setRandomNumber] = useState(0);
  const navigate = useNavigate();

  const handleViewClick = (id) =>{
    navigate(`/boards/${id}`)
  }

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
      fetchBoards(selectedCategory, searchWord, recentBoards);
  }, [selectedCategory, searchWord, recentBoards])

  const fetchBoards = async(category, search, recentBoards) => {
    try{
      const url = new URL(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards`)
      if (category) {
        isSetRecentBoards(false)
        url.searchParams.append('category', category)
      };
      if (search){
        isSetRecentBoards(false)
        url.searchParams.append('search', search)
      };
      const response = await fetch(url.toString());
      const data = await response.json();
      if (recentBoards === true) {
        data.sort((a, b) => (b.id - a.id))
        setBoards(data);
      } else{
        setBoards(data);
      }

    } catch (error) {
      console.error('Error:', error);
    }
}

  const handleCategoryClick = (category) => {
    if (category === "Recent"){
      isSetRecentBoards(!recentBoards)
    } else{
      setSelectedCategory(category);
    }
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

  const handleSearchChange = (e) =>{
    setSearchWord(e.target.value);
  }

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
        board={board}
        handleViewClick={handleViewClick}/>
      </>
    )
  })


  return (
    <>
      <SearchBoards handleBoardForm = {handleBoardForm} handleSearchChange={handleSearchChange} searchWords={searchWord}/>
      <BoardCategories handleCategoryClick={handleCategoryClick}/>
      <div className="boardDisplay">
        {board}
      </div>

      {isBoardForm == true && (
        <BoardForm setIsBoardFormOpen = {closeBoardForm} randomNumber={randomNumber} fetchBoards={fetchBoards}/>
      )}
    </>
  )
}

export default BoardsPage;
