// src/ShowGames.jsx
import React, { useState, useEffect } from 'react';
import { getGames } from '../../utils/fetch';

function ShowGames() {
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getGames(page, query);
        setGames(data.results);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, [page, query]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPage(1); // Reset page to 1 when search query changes
  };

  const handleNextPage = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <h1>RAWG Games</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for games"
      />
      <div>
        {games.map((game) => (
          <div key={game.id}>
            <h2>{game.name}</h2>
            <img src={game.background_image} alt={game.name} style={{ width: '200px' }} />
            <p>Released: {game.released}</p>
            <p>Rating: {game.rating}</p>
          </div>
        ))}
      </div>
      <div>
        <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
}

export default ShowGames;
