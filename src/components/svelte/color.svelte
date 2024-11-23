<script>
  import { onMount } from "svelte";

  const THEME = {
    LIGHT: "light",
    DARK: "dark",
    SYSTEM: "system",
  };

  let themeselex;

  $: {
    if (themeselex) {
      document.documentElement.classList.remove(THEME.DARK, THEME.LIGHT);
      if (themeselex === THEME.SYSTEM) {
        const darks = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        const theme = darks ? THEME.DARK : THEME.LIGHT;
        document.documentElement.classList.add(theme);
      } else {
        document.documentElement.classList.add(themeselex);
      }
    }
  }

  function handleThemeChange() {
    if (themeselex === THEME.SYSTEM) {
      themeselex = THEME.LIGHT;
      localStorage.main = THEME.LIGHT;
    } else if (themeselex === THEME.LIGHT) {
      themeselex = THEME.DARK;
      localStorage.main = THEME.DARK;
    } else {
      themeselex = THEME.SYSTEM;
      localStorage.removeItem("main");
    }
  }

  onMount(() => {
    const guard = localStorage.main;
    if (!guard) {
      themeselex = THEME.SYSTEM;
    } else if (guard === THEME.DARK) {
      themeselex = THEME.DARK;
    } else if (guard === THEME.LIGHT) {
      themeselex = THEME.LIGHT;
    }
  });
</script>

<button class="theme-button text-xl" on:click={handleThemeChange}>
  {#if themeselex === THEME.SYSTEM}
    💻
  {:else if themeselex === THEME.DARK}
    🌜
  {:else if themeselex === THEME.LIGHT}
    🌞
  {/if}
</button>

<style>
  .theme-button {
    animation: fadeIn 2s ease;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>
