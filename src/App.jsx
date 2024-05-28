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
    setLoading(true);
    try {
      const data = await getGames(page);
      if (!data.error) {
        setGames(prevGames => [...prevGames, ...data.items]);
        setTotalPages(data.totalPages);
      }
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Juegos</h1>
      {loading ? (
        <p className="text-alert">Cargando...</p>
      ) : (
        <ShowGames games={games} onClick={() => setPage(prevPage => prevPage + 1)} />
      )}
    </div>
  );
}

export default App;
