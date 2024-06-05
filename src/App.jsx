import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navBar/NavBar';
import ShowGames from './components/games/allGames/ShowGames';
import SavedGamesList from './components/games/savedGames/SavedGames';
import AllAmiibos from './components/amiibos/AllAmiibos';
import Home from './components/Home/Home';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show-games" element={<ShowGames />} />
          <Route path="/saved-games" element={<SavedGamesList />} />
          <Route path="/all-amiibos" element={<AllAmiibos />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
