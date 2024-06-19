import './BoardCategories.css'

function BoardCategories(setView) {
  const BoardOptions = [
    {id: 'all', label: 'All'},
    {id: 'recent', label: 'Recent'},
    {id: 'celebration', label: 'Celebration'},
    {id: 'thankYou', label: 'Thank You'},
    {id: 'inspiration', label: 'Inspiration'},
  ]

  return (
    <>
      <div className="boardCategories">
        {BoardOptions.map(({id, label}) =>
              <button key={id} className="boardCategoryButton" onClick={() => setView(id)}> {label} </button>
        )}
      </div>
    </>
  );
}

export default BoardCategories;
