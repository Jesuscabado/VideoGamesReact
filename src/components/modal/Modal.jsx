import React from 'react';
import './Modal.css';

function GenericModal({ item, type, onClose }) {
  if (!item) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close" onClick={onClose}>&times;</button>
        {type === 'game' ? (
          <>
            <h2>{item.character}</h2>
            <img src={item.image} alt={item.character} />
            <p>Amiibo: {item.amiiboSeries}</p>
            <p>Saga: {item.gameSeries}</p>
            <p>Tipo de Amiibo: {item.type}</p>
            <p>Fecha de Lanzamiento en Europa: {item.release?.eu}</p>
            
          </>
        ) : (
          <>
          <h2>{item.name}</h2>
            <img src={item.background_image} alt={item.name} />
            <p>Released: {item.released}</p>
            <p>Rating: {item.rating}</p>
            <p>Genres: {item.genres?.map(genre => genre.name).join(', ')}</p>
            <p>Description: {item.description_raw}</p>
            <p>Platforms: {item.platforms?.map(platform => platform.platform.name).join(', ')}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default GenericModal;
