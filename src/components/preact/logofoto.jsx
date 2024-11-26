import { useState, useEffect } from 'preact/hooks';

export default function ProfileSwitch() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const handleVisibility = (event) => {
      setIsVisible(event.detail.isVisible);
    };

    window.addEventListener('elementVisibility', handleVisibility);

    return () => {
      window.removeEventListener('elementVisibility', handleVisibility);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setTimeout(() => {
        setShouldAnimate(true);
      }, 50);
    } else {
      setShouldAnimate(false);
    }
  }, [isVisible]);

  return (
    <div>
      {isVisible ? (
        "Dager"
      ) : (
        <img 
          src="/img/pickle.png" 
          alt="Foto de perfil" 
          className={`
            w-6 h-6 
            pointer-events-none 
            rounded-full 
            object-cover 
            transition-opacity 
            duration-700 
            ease-in-out
            ${shouldAnimate ? 'opacity-100' : 'opacity-0'}
          `}
        />
      )}
    </div>
  );
}