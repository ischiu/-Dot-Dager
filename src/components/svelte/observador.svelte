<script>
  import { onMount } from 'svelte';

  function observe(element) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const event = new CustomEvent('elementVisibility', {
          detail: { isVisible: entry.isIntersecting }
        });
        window.dispatchEvent(event);
      });
    }, {
      threshold: 0
    });

    observer.observe(element);

    return {
      destroy() {
        observer.disconnect();
      }
    };
  }
</script>

<div use:observe>
  <slot></slot>
</div>