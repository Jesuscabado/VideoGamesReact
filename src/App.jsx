import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getGames } from './utils/fetchGames';
import ShowGames from './components/games/allGames/ShowGames';
import Navbar from './components/navBar/NavBar';
import SavedGamesList from './components/games/savedGames/SavedGames'; // Importa el componente SavedGamesList
import AllAmiibos from './components/amiibos/AllAmiibos';
import './App.css';

function App() {
  const [games, setGames] = useState([]);
  const [savedGames, setSavedGames] = useState(JSON.parse(localStorage.getItem('savedGames')) || []);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    handleGetData();
  }, [page]);

  const handleGetData = async () => {
    setLoading(true); // Iniciar carga
    const data = await getGames(page);
    console.log("data", data);
    if (!data.error) {
      setTimeout(() => {
        setGames(data.results);
        setTotalPages(data.count);
        setLoading(false); // Finalizar carga después de 2 segundos
      }, 2000);
    }
  };

  return (
    <Router>
      <div>
        <Navbar />
        {loading ? (
          <div className="loading-container">
            <p className="text-alert">Cargando...</p>
            <img src="https://64.media.tumblr.com/e694cc11937e723db7f29cb0fba7364d/tumblr_p845bbxi591w1nb8jo9_r2_640.gif" alt="Loading" />
          </div>
        ) : (
          <Routes>
            <Route path="/show-games" element={<ShowGames games={games} onClick={() => setPage(page => page + 1)} />} />
            <Route path="/saved-games" element={<SavedGamesList savedGames={savedGames} />} /> {/* Añade la ruta para el componente SavedGamesList */}
            <Route path="/all-amiibos" element={<AllAmiibos />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
