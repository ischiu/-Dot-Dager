<script>
    import { onMount, onDestroy } from 'svelte';
    
    const technologies = [
      { titulo: "Ruby", imagen: "/img/ruby.png" },
      { titulo: "C#", imagen: "/img/c-sharp.png" },
      { titulo: "JavaScript", imagen: "/img/javascript.png" },
      { titulo: "HTML", imagen: "/img/html.png" },
      { titulo: "ShaderLab", imagen: "/img/unity.png" },
      { titulo: "TypeScript", imagen: "/img/typescript.png" },
      { titulo: "Visual Basic .NET", imagen: "/img/visual-basic.png" },
      { titulo: "Jupyter Notebook", imagen: "/img/Jupyter.png" },
      { titulo: "Ruby", imagen: "/img/ruby.png" },
      { titulo: "C#", imagen: "/img/c-sharp.png" },
      { titulo: "JavaScript", imagen: "/img/javascript.png" },
      { titulo: "HTML", imagen: "/img/html.png" },
      { titulo: "ShaderLab", imagen: "/img/unity.png" },
      { titulo: "TypeScript", imagen: "/img/typescript.png" },
      { titulo: "Visual Basic .NET", imagen: "/img/visual-basic.png" },
      { titulo: "Jupyter Notebook", imagen: "/img/Jupyter.png" },
      { titulo: "Ruby", imagen: "/img/ruby.png" },
      { titulo: "C#", imagen: "/img/c-sharp.png" },
      { titulo: "JavaScript", imagen: "/img/javascript.png" },
      { titulo: "HTML", imagen: "/img/html.png" },
      { titulo: "ShaderLab", imagen: "/img/unity.png" },
      { titulo: "TypeScript", imagen: "/img/typescript.png" },
      { titulo: "Visual Basic .NET", imagen: "/img/visual-basic.png" },
      { titulo: "Jupyter Notebook", imagen: "/img/Jupyter.png" },
      { titulo: "Ruby", imagen: "/img/ruby.png" },
      { titulo: "C#", imagen: "/img/c-sharp.png" },
      { titulo: "JavaScript", imagen: "/img/javascript.png" },
      { titulo: "HTML", imagen: "/img/html.png" },
      { titulo: "ShaderLab", imagen: "/img/unity.png" },
      { titulo: "TypeScript", imagen: "/img/typescript.png" },
      { titulo: "Visual Basic .NET", imagen: "/img/visual-basic.png" },
      { titulo: "Jupyter", imagen: "/img/Jupyter.png" },
      { titulo: "Ruby", imagen: "/img/ruby.png" },
      { titulo: "C#", imagen: "/img/c-sharp.png" },
      { titulo: "JavaScript", imagen: "/img/javascript.png" },
      { titulo: "HTML", imagen: "/img/html.png" },
      { titulo: "ShaderLab", imagen: "/img/unity.png" },
      { titulo: "TypeScript", imagen: "/img/typescript.png" },
      { titulo: "Visual Basic .NET", imagen: "/img/visual-basic.png" },
      { titulo: "Jupyter Notebook", imagen: "/img/Jupyter.png" },
      { titulo: "Ruby", imagen: "/img/ruby.png" },
      { titulo: "C#", imagen: "/img/c-sharp.png" },
      { titulo: "JavaScript", imagen: "/img/javascript.png" },
      { titulo: "HTML", imagen: "/img/html.png" },
      { titulo: "ShaderLab", imagen: "/img/unity.png" },
      { titulo: "TypeScript", imagen: "/img/typescript.png" },
      { titulo: "Visual Basic .NET", imagen: "/img/visual-basic.png" },
      { titulo: "Jupyter Notebook", imagen: "/img/Jupyter.png" }
    ];
    
    let rowContainer;
    let isPaused = false;
    let currentTitle = '';
    let showTitle = false;
    
    const CARD_WIDTH = 256;
    const CARD_MARGIN = 16;
    const SCROLL_SPEED = 2;
    
    $: totalWidth = (CARD_WIDTH + CARD_MARGIN) * technologies.length;
    
    function createTechElement(tech) {
      const figure = document.createElement('figure');
      figure.className = ' flex-none cursor-pointer w-[100px] h-[100px] sm:w-[125px] sm:h-[125px] md:w-[156px] md:h-[156px] xl:w-[256px] xl:h-[256px]  overflow-hidden rounded-xl mt-4 mr-4 ease-in-out hover:-translate-y-0.5';
      figure.innerHTML = `
        <img src="${tech.imagen}" alt="${tech.titulo}" class="w-fit h-fit px-4 pointer-events-none object-cover rounded-lg">
      `;
      
      figure.addEventListener('mouseenter', () => {
        currentTitle = tech.titulo;
        showTitle = true;
        isPaused = true;
      });
      
      figure.addEventListener('mouseleave', () => {
        showTitle = false;
        isPaused = false;
      });
      
      return figure;
    }
    
    function initializeRow(container) {
      container.style.width = `${totalWidth * 3}px`;
      for (let i = 0; i < 3; i++) {
        technologies.forEach(tech => {
          container.appendChild(createTechElement(tech));
        });
      }
      return { position: -totalWidth };
    }
    
    function updateRow(container, state) {
      if (!isPaused) {
        state.position -= SCROLL_SPEED;
        if (state.position <= -totalWidth * 2) {
          state.position += totalWidth;
        }
      }
      container.style.transform = `translateX(${state.position}px)`;
    }
    
    let animationFrameId;
    let rowState;
    
    function animate() {
      updateRow(rowContainer, rowState);
      animationFrameId = requestAnimationFrame(animate);
    }
    
    onMount(() => {
      rowState = initializeRow(rowContainer);
      animate();
    });
    
    onDestroy(() => {
      if (typeof window !== 'undefined' && typeof cancelAnimationFrame !== 'undefined') {
        cancelAnimationFrame(animationFrameId);
      }
    });
    </script>
    
    <aside class="select-none relative h-fit w-full flex flex-col items-center justify-center overflow-hidden rounded-lg ">
      {#if showTitle}
        <div class="absolute top-8 left-0 right-0 text-center  transition-opacity duration-300 ease-in-out" class:opacity-100={showTitle} class:opacity-0={!showTitle}>
          <h2 class=" text-lg sm:text-xl md:text-2xl xl:text-3xl font-bold text-primary dark:text-secondary">
            {currentTitle}
          </h2>
        </div>
      {/if}
    
      <div class="relative w-full h-fit overflow-hidden mt-14">
        <div bind:this={rowContainer} class="flex py-4"></div>
      </div>
    

      <div class="absolute bottom-0 left-0 w-1/3 h-full pointer-events-none bg-gradient-to-r from-background2-light dark:from-background2-dark"></div>
      <div class="absolute bottom-0 right-0 w-1/3 h-full pointer-events-none bg-gradient-to-l from-background2-light dark:from-background2-dark"></div>
    </aside>
    
    <style>
      figure {
        transition: all 0.3s ease-in-out;
      }
      
      figure:hover {
        transform: scale(1.05);
      }
      
      img {
        transition: all 0.3s ease-in-out;
      }
      
      figure:hover img {
        filter: brightness(1.1);
      }
    </style>