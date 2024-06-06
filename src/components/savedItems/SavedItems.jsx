import React, { useState } from 'react';
import SaveButton from '../buttons/favButton/FavButton';
import GenericModal from '../modal/Modal';
import './SavedItems.css';

function SavedItemsList() {
  const [savedItems, setSavedItems] = useState(JSON.parse(localStorage.getItem('savedItems')) || []);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleSaveItem = (item) => {
    const isSaved = savedItems.some(savedItem => savedItem.id === item.id || savedItem.tail === item.tail);
    let updatedItems;
    if (isSaved) {
      if (item.id) {
        // Eliminar solo el juego con el mismo ID
        updatedItems = savedItems.filter(savedItem => savedItem.id !== item.id);
      } else {
        // Eliminar solo el amiibo con la misma cola
        updatedItems = savedItems.filter(savedItem => savedItem.tail !== item.tail);
      }
    } else {
      // Agregar la propiedad 'type' para distinguir entre amiibos y juegos
      const updatedItem = { ...item, type: item.id ? 'game' : 'amiibo' };
      updatedItems = [...savedItems, updatedItem];
    }
    setSavedItems(updatedItems);
    localStorage.setItem('savedItems', JSON.stringify(updatedItems));
  };
  
  const isItemSaved = (item) => {
    if (item.id) {
      // Es un juego
      return savedItems.some(savedItem => savedItem.id === item.id);
    } else {
      // Es un amiibo
      return savedItems.some(savedItem => savedItem.tail === item.tail);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="items-container">
      <h1>Saved Items</h1>
      <div className="items-grid">
        {savedItems.map((item) => (
          <div key={item.id || item.tail} className="item-card">
            <img 
              className="item-img custom-cursor" 
              src={item.background_image || item.image} 
              alt={item.name || item.character} 
              onClick={() => handleItemClick(item)} 
            />
            <h2>{item.name || item.character}</h2>
            {item.released && <p>Released: {item.released}</p>}
            {item.rating && <p>Rating: {item.rating}</p>}
            {item.type && <p>Tipo de Amiibo: {item.type}</p>}
            {item.release?.eu && <p>Fecha de Lanzamiento en Europa: {item.release.eu}</p>}
            <SaveButton 
              item={item} 
              isSaved={isItemSaved(item)} 
              handleSaveItem={handleSaveItem} 
            />
          </div>
        ))}
      </div>
      {isModalOpen && (
        <GenericModal 
          item={selectedItem} 
          type={selectedItem.type ? 'game' : 'amiibo'} 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}

export default SavedItemsList;
