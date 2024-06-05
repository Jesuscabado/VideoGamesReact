import React, { useState } from 'react';
import audioClip from '/audio/ffix_intro.mp3'; // Asegúrate de poner la ruta correcta a tu archivo de audio
import './Home.css';

function Home() {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="home-container">
      <audio id="background-audio" src={audioClip} autoPlay loop muted={isMuted}></audio>
      <button className="mute-button" onClick={toggleMute}>
        {isMuted ? 'Unmute' : 'Mute'}
      </button>
    </div>
  );
}

export default Home;
