import saveIcon from '/icons/unSaveGame.png';
import savedIcon from '/icons/saveGame.png';


function SaveGamesButton({ selectedGame, isSaved, handleSaveGame }) {
  return (
    <button onClick={() => handleSaveGame(selectedGame, isSaved)} style={{ display: 'flex', alignItems: 'center' }}>
      <img 
        src={isSaved ? savedIcon : saveIcon} 
        alt={isSaved ? 'Eliminar juego guardado' : 'Guardar juego'}
        style={{display: 'flex', width: '25px', height: '25px', marginRight: '8px' }} 
      />
    </button>
  );
}

export default SaveGamesButton;
