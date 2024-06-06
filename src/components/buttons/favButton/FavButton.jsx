import saveIcon from '/icons/unSaveGame.png';
import savedIcon from '/icons/saveGame.png';

function SaveButton({ item, isSaved, handleSaveItem }) {
  return (
    <button onClick={() => handleSaveItem(item, isSaved)} style={{ display: 'flex', alignItems: 'center' }}>
      <img 
        src={isSaved ? savedIcon : saveIcon} 
        alt={isSaved ? 'Eliminar item guardado' : 'Guardar item'}
        style={{ display: 'flex', width: '25px', height: '25px', marginRight: '8px' }} 
      />
    </button>
  );
}

export default SaveButton;
