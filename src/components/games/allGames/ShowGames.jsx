// ShowGames.js
import React, { useState, useEffect } from 'react';
import { getGames } from '../../../utils/fetchGames';
import SaveButton from '../../buttons/favButton/FavButton';
import GenericModal from '../../modal/Modal';
import './ShowGames.css'; 

function ShowGames() {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [savedItems, setSavedItems] = useState(JSON.parse(localStorage.getItem('savedItems')) || []);
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

  const handleSaveItem = (game) => {
    const isSaved = savedItems.some(savedItem => savedItem.id === game.id);
    let updatedItems;
    if (isSaved) {
      updatedItems = savedItems.filter(savedItem => savedItem.id !== game.id);
    } else {
      updatedItems = [...savedItems, game];
    }
    setSavedItems(updatedItems);
    localStorage.setItem('savedItems', JSON.stringify(updatedItems));
  };

  const isItemSaved = (game) => {
    return savedItems.some(savedItem => savedItem.id === game.id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
  };

  return (
    <div className="container">
      <h1 className='.pixel'>Pixel Games</h1>
      <div className="games-grid">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <img className="game-img custom-cursor" src={game.background_image} alt={game.name} onClick={() => handleGameClick(game)} />
            <h2>{game.name}</h2>
            <p>Released: {game.released}</p>
            <p>Rating: {game.rating}</p>
            <SaveButton 
              item={game} 
              isSaved={isItemSaved(game)} 
              handleSaveItem={handleSaveItem} 
            />
          </div>
        ))}
      </div>
      {isModalOpen && (
        <GenericModal 
          item={selectedGame} 
          type="game" 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}

export default ShowGames;
