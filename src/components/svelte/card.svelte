<script>
  export let emo;
  export let title;
  export let description;
  export let imageUrl;
  
  function observe(element, className) {
    element.classList.add(className);
  }
</script>

<div class="card-container transition-transform duration-300">
  <div class="wrapper" use:observe={"animate-in"}>

    <div class="card-front bg-background1-light dark:bg-background1-dark p-8 rounded-2xl shadow-lg hover:shadow-xl border border-complementary-secondary/30 backdrop-blur-sm">
      <div class="text-xl sm:text-2xl md:text-3xl xl:text-5xl mb-4 text-center select-none hover:scale-110 transition-transform duration-300">{emo}</div>
      <h3 class="text-lg sm:text-xl md:text-2xl xl:text-3xl font-serif text-center mb-3 text-complementary-primary font-bold hover:text-complementary-secondary transition-colors duration-300">{title}</h3>
      <p class="text-xs sm:text-sm text-center leading-relaxed text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </div>
    

    <div class="select-none card-back bg-background1-light dark:bg-background1-dark rounded-2xl shadow-lg hover:shadow-xl border border-complementary-secondary/30 overflow-hidden group">
      <div class="relative h-full">
        <img
          src={imageUrl || "/img/pickle.png"}
          alt={title}
          class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 flex items-center justify-center backdrop-blur-[2px] group-hover:backdrop-blur-none transition-all duration-300">
          <h3 class="text-lg sm:text-xl md:text-2xl xl:text-3xl font-serif text-center text-complementary-secondary font-bold px-4 drop-shadow-lg transform group-hover:scale-105 transition-transform duration-300">
            {title}
          </h3>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .card-container {
    perspective: 1000px;
    aspect-ratio: 4 / 6;
    width: 100%;
    max-width: 300px;
  }
  
  .wrapper {
    opacity: 0;
    pointer-events: none;
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }
  
  .wrapper:global(.animate-in) {
    opacity: 1;
    pointer-events: auto;
    animation: escala 1s;
  }
  
  .card-container:hover .wrapper {
    transform: rotateY(180deg);
  }
  
  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
  }
  
  .card-back {
    transform: rotateY(180deg);
  }
  
  @keyframes escala {
    0% {
      transform: scale(0);
      transform-origin: 50% 0%;
    }
    100% {
      transform: scale(1);
      transform-origin: 50% 0%;
    }
  }
</style>