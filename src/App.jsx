import { useEffect, useState } from 'react';
import { getGames } from './utils/fetch';
import ShowGames from './components/games/ShowGames';
import './App.css';

function App() {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    handleGetData();
  },[page]);
  const handleGetData = async()=>{
    const data = await getGames(page);
    console.log("data",data);
    if(!data.error) {
      setGames(data.results);
      setTotalPages(data.count);
      setLoading(false);
    }
  }
  let html  = <ShowGames games={games} onClick={() => setPage(page => page + 1)}/>
  if(games.length == 0){
    html = <p className="text-alert">Cargando...</p>
  }
  return (
    <div>
      <h1>Eventos</h1>
      {html}
      
    </div>
  )
}

export default App