import React, { useState, useEffect } from 'react';
import SaveGamesButton from '../buttons/favButton/FavButton';
import GameModal from '../modal/Modal';
import { getGames } from '../../utils/fetch';
import './SavedGames.css'; // Asegúrate de importar el archivo CSS

function SavedGamesList() {
  const [savedGames, setSavedGames] = useState(JSON.parse(localStorage.getItem('savedGames')) || []);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const data = await getGames();
        setGames(data.results);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchGames();
  }, []);

  const handleGameClick = (game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const handleSaveGame = (game) => {
    const isSaved = savedGames.some(savedGame => savedGame.id === game.id);
    let updatedGames;
    if (isSaved) {
      updatedGames = savedGames.filter(savedGame => savedGame.id !== game.id);
    } else {
      updatedGames = [...savedGames, game];
    }
    setSavedGames(updatedGames);
    localStorage.setItem('savedGames', JSON.stringify(updatedGames));
  };

  const isGameSaved = (game) => {
    return savedGames.some(savedGame => savedGame.id === game.id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
  };

  return (
    <div className="saved-games-container">
      <h1>Saved Games</h1>
      <div className="saved-games-grid">
        {savedGames.map((game) => (
          <div key={game.id} className="game-card">
            <img className="game-img custom-cursor" src={game.background_image} alt={game.name} onClick={() => handleGameClick(game)} />
            <h2>{game.name}</h2>
            <p>Released: {game.released}</p>
            <p>Rating: {game.rating}</p>
            <SaveGamesButton 
              selectedGame={game} 
              isSaved={isGameSaved(game)} 
              handleSaveGame={handleSaveGame} 
            />
          </div>
        ))}
      </div>
      {isModalOpen && (
        <GameModal 
          game={selectedGame} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}

export default SavedGamesList;
