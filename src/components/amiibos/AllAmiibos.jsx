// AllAmiibos.js
import React, { useState, useEffect } from 'react';
import { getAmiibos } from '../../utils/fetchAmiibo';
import GenericModal from '../modal/Modal';
import SaveButton from '../buttons/favButton/FavButton';
import './AllAmiibos.css';

function AllAmiibos() {
  const [amiibos, setAmiibos] = useState([]);
  const [selectedAmiibo, setSelectedAmiibo] = useState(null);
  const [savedItems, setSavedItems] = useState(JSON.parse(localStorage.getItem('savedItems')) || []);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAmiibos = async () => {
      try {
        const data = await getAmiibos();
        if (data.amiibo) {
          setAmiibos(data.amiibo);
        } else {
          console.error('Unexpected data format:', data);
        }
      } catch (error) {
        console.error('Error fetching amiibos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAmiibos();
  }, []);

  const handleAmiiboClick = (amiibo) => {
    setSelectedAmiibo(amiibo);
    setIsModalOpen(true);
  };

  const handleSaveItem = (amiibo) => {
    const isSaved = savedItems.some(savedItem => savedItem.tail === amiibo.tail);
    let updatedItems;
    if (isSaved) {
      updatedItems = savedItems.filter(savedItem => savedItem.tail !== amiibo.tail);
    } else {
      updatedItems = [...savedItems, amiibo];
    }
    setSavedItems(updatedItems);
    localStorage.setItem('savedItems', JSON.stringify(updatedItems));
  };

  const isItemSaved = (amiibo) => {
    return savedItems.some(savedItem => savedItem.tail === amiibo.tail);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAmiibo(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Amiibos</h1>
      <div className="amiibo-grid">
        {amiibos.map((amiibo) => (
          <div key={amiibo.tail} className="amiibo-card" >
            <h1>Saga: {amiibo.gameSeries}</h1>
            <h2>{amiibo.character}</h2>
            <img className="amiibo-img" onClick={() => handleAmiiboClick(amiibo)} src={amiibo.image} alt={amiibo.name} />
            <p>Tipo de Amiibo: {amiibo.type}</p>
            <p>Fecha de Lanzamiento en Europa: {amiibo.release.eu}</p>
            <SaveButton 
              item={amiibo} 
              isSaved={isItemSaved(amiibo)} 
              handleSaveItem={handleSaveItem} 
            />
          </div>
        ))}
      </div>
      {isModalOpen && (
        <GenericModal 
          item={selectedAmiibo} 
          type="amiibo" 
          onClose={handleCloseModal} 
        />
      )}
    </div>
  );
}

export default AllAmiibos;
