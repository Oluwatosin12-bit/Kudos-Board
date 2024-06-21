import './BoardCategories.css'

function BoardCategories({handleCategoryClick}) {
  const BoardOptions = [
    {id: 'All', label: ''},
    {id: 'Recent', label: 'Recent'},
    {id: 'Celebration', label: 'Celebration'},
    {id: 'Thank You', label: 'Thank You'},
    {id: 'Inspiration', label: 'Inspiration'},
  ]

  return (
    <>
      <div className="boardCategories">
        {BoardOptions.map(({id, label}) =>
              <button
              onClick={() =>handleCategoryClick(label)}
              key={id}
              className="boardCategoryButton" > {id} </button>
        )}
      </div>
    </>
  );
}

export default BoardCategories;
