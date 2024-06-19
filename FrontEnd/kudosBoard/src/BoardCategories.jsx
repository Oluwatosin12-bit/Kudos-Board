// import './BoardCategories.css'
// import { useState } from 'react'

// function BoardCategories({setBoards, handleCategoryClick}) {
//   // const [selectedCategory, setSelectedCategory] = useState('all')
//   const BoardOptions = [
//     {id: 'all', label: 'All'},
//     {id: 'recent', label: 'Recent'},
//     {id: 'celebration', label: 'Celebration'},
//     {id: 'thankYou', label: 'Thank You'},
//     {id: 'inspiration', label: 'Inspiration'},
//   ]



//   const fetchCategory = async (category) => {
//     try{
//       const response = await fetch(`${import.meta.env.VITE_BACKEND_ADDRESS}/boards/category=${category}`);
//       if (response.ok === true) {
//         const data = await response.json();
//         setBoards(data);
//         setSelectedCategory(category);
//       } else {
//         console.error('Error')
//       }
//     } catch (error) {
//       console.error('Error:', error)
//     }
//   };

//   return (
//     <>
//       <div className="boardCategories">
//         {BoardOptions.map(({id, label}) =>
//           <button
//           value={label}
//           // onChange={handleCategoryChange}
//           key={id}
//           className="boardCategoryButton"
//           onClick={() => {handleCategoryClick(label)}}> {label} </button>
//         )}
//       </div>
//     </>
//   );
// }

// export default BoardCategories;

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
