<script>
    import { onMount } from "svelte";
    export let name1;
    export let name2;
    export let mailto1;
    export let mailto2;
    export let text1;
    export let text2;
    export let clause;
    export let submit1;
    export let submit2;

    export let alerta1;
    export let alerta2;
    export let alerta3;
    export let alerta4;

    let siteKey = "0x4AAAAAAA0uoPY1W7sL0ifv";
    let widgetId;
    let estado = false;
    let turnstileToken = "";
    let selectedOption = "";
    let widgetSize = "flexible";
    
    onMount(() => {
      const mediaQuery = window.matchMedia('(max-width: 375px)');
      const updateWidgetSize = (e) => {
        widgetSize = e.matches ? "compact" : "flexible";
        if (widgetId) {
          turnstile.remove(widgetId);
          renderWidget();
        }
      };
      mediaQuery.addListener(updateWidgetSize);
      updateWidgetSize(mediaQuery);
    
      const hash = window.location.hash;
      if (hash === "#Asesoramiento") {
        selectedOption = "asesoramiento";
      }
    
      if (window.turnstile) {
        renderWidget();
        return;
      }
    
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        renderWidget();
      };
      document.head.appendChild(script);
    
      return () => {
        mediaQuery.removeListener(updateWidgetSize);
        
        if (widgetId) {
          turnstile.remove(widgetId);
        }
      };
    });
    
    function renderWidget() {
      widgetId = turnstile.render("#turnstile-widget", {
        sitekey: siteKey,
        theme: "auto",
        language: clause,
        size: widgetSize,
        callback: (token) => {
          estado = true;
          turnstileToken = token;
        },
      });
    }
    
    async function handleSubmit(event) {
      event.preventDefault();
    
      if (!estado) {
        alert(alerta1);
        return;
      }
    
      const formData = new FormData(event.target);
    
      formData.set("cf-turnstile-response", turnstileToken);
    
      try {
        const response = await fetch('/success', {
          method: 'POST',
          body: JSON.stringify(Object.fromEntries(formData)),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();
        if (result.success) {
          alert(alerta2);
          event.target.reset();
          turnstile.reset(widgetId);
          estado = false;
        } else {
          alert(result.error || alerta3);
          turnstile.reset(widgetId);
          estado = false;
        }
      } catch (error) {
        alert(alerta4);
        turnstile.reset(widgetId);
        estado = false;
      }
    }
    </script>

    <form 
      on:submit={handleSubmit} 
      class="select-none max-w-2xl mx-auto p-6 space-y-6 bg-background1-light dark:bg-background1-dark rounded-lg shadow-lg"
    > <div class="space-y-4 sm:space-y-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-2">
                <label for="firstName" class="block text-sm font-medium ">{name1}</label>
                <input 
                    name="Nombre"
                    type="text" 
                    id="firstName" 
                    class="w-full px-4 py-2  bg-background2-light dark:bg-background2-dark border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-complementary-primary hover:border-primary dark:hover:border-complementary-primary transition-colors duration-200"
                    required
                >
            </div>
            
            <div class="space-y-2">
                <label for="lastName" class="block text-sm font-medium ">{name2}</label>
                <input
                    name="Apellido"
                    type="text" 
                    id="lastName" 
                    class="w-full px-4 py-2  bg-background2-light dark:bg-background2-dark border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-complementary-primary hover:border-primary dark:hover:border-complementary-primary transition-colors duration-200"
                    required
                >
            </div>
        </div>
  
  
        <div class="space-y-2">
            <label for="email" class="block text-sm font-medium ">{mailto1}</label>
            <input
                name="Correo"
                type="email"
                id="email"
                placeholder={mailto2}
                class="w-full px-4 py-2 bg-background2-light dark:bg-background2-dark border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-complementary-primary hover:border-primary dark:hover:border-complementary-primary transition-colors duration-200"
                required
            >
        </div>


    
        <div class="space-y-2">
            <label for="message" class="block text-sm font-medium ">{text1}</label>
            <textarea
                name="Mensaje"
                id="message" 
                placeholder={text2}
                class="w-full px-4 py-2 h-32  bg-background2-light dark:bg-background2-dark border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-complementary-primary hover:border-primary dark:hover:border-complementary-primary transition-colors duration-200 resize-y"
                required
            ></textarea>
        </div>
    </div>
    <div class="flex justify-center">
        <div id="turnstile-widget"></div>
    </div>
  
    <div class="space-y-4">
        <input 
            type="submit" 
            class="w-full {estado ? 'bg-primary':'bg-secondary user-disabled'} px-6 py-3 text-sm font-bold text-txt-dark  rounded-md transition-colors duration-300"
            value={estado ?  submit2: submit1 }
            disabled={!estado}
            >
    </div>
  </form>