import { useEffect, useState } from 'react';
import { getGames } from './utils/fetch';
import ShowGames from './components/games/ShowGames';
import './App.css';

function App() {
  const [games, setGames] = useState([]);
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
    <div>
      <h1>Eventos</h1>
      {loading ? (
        <div className="loading-container">
          <p className="text-alert">Cargando...</p>
          <img src="https://i.pinimg.com/originals/a6/af/d6/a6afd66d0c0f9ff3f7f4e78ea62f9bdb.gif" alt="Loading" />
        </div>
      ) : (
        <ShowGames games={games} onClick={() => setPage(page => page + 1)} />
      )}
    </div>
  );
}

export default App;
