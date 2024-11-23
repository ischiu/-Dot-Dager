import { useState, useEffect } from 'preact/hooks';

export default function MusicPlayerToggle() {
  const [canchion, setcanchion] = useState(false);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const rutas = new Audio('/music/song.ogg');
    rutas.loop = true;
    setAudio(rutas);
    const audioEvent = new CustomEvent('audioStateChanged', {
      detail: { isPlaying: false }
    });
    document.dispatchEvent(audioEvent);

    return () => {
      rutas.pause();
      rutas.src = '';
    };
  }, []);

  const handleToggle = () => {
    if (!audio) return;

    if (canchion) {
      audio.pause();
    } else {
      audio.play();
    }
    const newState = !canchion;
    setcanchion(newState);

    const audioEvent = new CustomEvent('audioStateChanged', {
      detail: { isPlaying: newState }
    });
    document.dispatchEvent(audioEvent);
  };

  return (
    <button
      onClick={handleToggle}
      className={`
        text-xl
        transition-all
        duration-300
        transform
        hover:scale-110
        ${canchion ? 'animate-spin-slow' : ''}
      `}
      aria-label={canchion ? "Pause Music" : "Play Music"}
    >
      {canchion ? '💿' : '💽'}
      <style>
        {`
          @keyframes spin-slow {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .animate-spin-slow {
            animation: spin-slow 4s linear infinite;
          }
        `}
      </style>
    </button>
  );
}