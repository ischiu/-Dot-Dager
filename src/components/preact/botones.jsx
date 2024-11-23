import { useState } from 'preact/hooks';

const NavigationButtons = () => {
  const [selected, setSelected] = useState('youtube');

  const handleClick = (platform) => {
    setSelected(platform);
    const event = new CustomEvent('platformChange', { detail: { platform } });
    window.dispatchEvent(event);
  };

  return (
    <div class="flex justify-center gap-4 mt-4">
      <button
        onClick={() => handleClick('youtube')}
        class={`p-3 rounded-full shadow-md ${
          selected === 'youtube' ? 'bg-red-100 text-white' : 'bg-background1-light dark:bg-background1-dark'
        }`}
      >
        <img src="/img/youtube.svg" alt="YouTube" class="w-6 h-6" />
      </button>
      <button
        onClick={() => handleClick('spotify')}
        class={`p-3 rounded-full shadow-md ${
          selected === 'spotify' ? 'bg-green-100 text-white' : 'bg-background1-light dark:bg-background1-dark'
        }`}
      >
        <img src="/img/spotify.svg" alt="Spotify" class="w-6 h-6" />
      </button>
    </div>
  );
};

export default NavigationButtons;
