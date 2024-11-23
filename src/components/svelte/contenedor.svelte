<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  let platform = "youtube";

  onMount(() => {
    const handlePlatformChange = (event) => {
      platform = event.detail.platform;
    };

    window.addEventListener("platformChange", handlePlatformChange);

    return () => {
      window.removeEventListener("platformChange", handlePlatformChange);
    };
  });
</script>

<div class="w-full max-w-lg mx-auto mt-6">
  <div
    class="p-6 bg-background1-light dark:bg-background1-dark rounded-2xl shadow-md"
    transition:fade
  >
    {#if platform === "youtube"}
      <h3
        class="text-lg mx-auto w-fit text-center sm:text-xl md:text-2xl lg:text-3xl"
      >
        <slot name="playlistitulo1" />
      </h3>
      <p class="text-sm text-center sm:text-base md:text-lg lg:text-xl mt-4">
        <slot name="playlistext1" />
      </p>
      <iframe
        title="dager come pito"
        src="https://www.youtube.com/embed/DaRes1TR3XQ"
        class="w-full aspect-video rounded shadow-md mt-4"
        allowfullscreen
      >
      </iframe>
    {/if}

    {#if platform === "spotify"}
      <h3 class="text-lg text-center sm:text-xl md:text-2xl lg:text-3xl">
        <slot name="playlistitulo2" />
      </h3>
      <p class="text-sm text-center sm:text-base md:text-lg lg:text-xl mt-4">
        <slot name="playlistext2" />
      </p>
      <iframe
        title="dager come pepino"
        src="https://open.spotify.com/embed/album/0A7t4Rrieafn3ucCrmuRTa"
        class="w-full mt-10"
        allow="encrypted-media"
      ></iframe>
      <iframe
        title="dager come pepino"
        src="https://open.spotify.com/embed/album/4HxQCxqU4GL4OF0wBMXJQG"
        class="w-full"
        allow="encrypted-media"
      ></iframe>
    {/if}
  </div>
</div>

<style>
  div {
    transition: all 0.3s ease-in-out;
  }
</style>
