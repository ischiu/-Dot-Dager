import { useState, useEffect } from 'preact/hooks';

export default function ProfileSwitch() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibility = (event) => {
      setIsVisible(event.detail.isVisible);
    };

    window.addEventListener('elementVisibility', handleVisibility);

    return () => {
      window.removeEventListener('elementVisibility', handleVisibility);
    };
  }, []);

  return (
    <div>
      {isVisible ? (
        "Dager"
      ) : (
        <img 
          src="/img/pickle.png" 
          alt="Foto de perfil" 
          class="w-6 h-6 pointer-events-none rounded-full object-cover"
        />
      )}
    </div>
  );
}