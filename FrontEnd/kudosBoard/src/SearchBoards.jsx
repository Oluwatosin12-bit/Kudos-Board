import './SearchBoards.css'

function SearchBoards({handleBoardForm}) {
    return (
      <>
        <div className = "searchArea">
          <input className = "searchInput" placeholder = "Search boards..."/>
          <button className = "searchButton"> Search </button>
          <button onClick={handleBoardForm} className = "createButton"> Create a New Board </button>
        </div>
      </>
    );
}

export default SearchBoards;
