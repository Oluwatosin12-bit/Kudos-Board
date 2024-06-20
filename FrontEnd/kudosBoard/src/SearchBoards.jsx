import './SearchBoards.css'

function SearchBoards({handleBoardForm, handleSearchChange, searchWord}) {
  return (
    <>
      <div className = "searchArea">
        <input value={searchWord} onChange={handleSearchChange} className = "searchInput" placeholder = "Search boards..."/>
        <button onClick={handleBoardForm} className = "createButton"> Create a New Board </button>
      </div>
    </>
  );
}

export default SearchBoards;
