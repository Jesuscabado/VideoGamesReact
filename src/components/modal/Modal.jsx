import './Modal.css';


function GameModal({ game, onClose }) {
  if (!game) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className='close' onClick={onClose}>&times;</button>
        <h2>{game.name}</h2>
        <img src={game.background_image} alt={game.name} />
        <p>Released: {game.released}</p>
        <p>Rating: {game.rating}</p>
        <p>Genres: {game.genres.map(genre => genre.name).join(', ')}</p>
        <p>Description: {game.description_raw}</p>
        <p>Platforms: {game.platforms.map(platform => platform.platform.name).join(', ')}</p>
      </div>
    </div>
  );
}

export default GameModal;
