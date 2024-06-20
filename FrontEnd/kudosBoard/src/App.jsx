import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BoardsPage from './BoardsPage'
import CardsPage from './CardsPage'

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<BoardsPage />} />
            <Route path="/boards/:id" element={<CardsPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
