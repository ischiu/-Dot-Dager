/** @type {import('tailwindcss').Config} */ 
export default { 
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'], 
	theme: { 
		extend: { 
		  screens: { 
			'ps': '890px', 
		  }, 
		  colors: { 
			primary: '#6C8EBF', // Azul pastel frio
			secondary: '#8F7266', // Marrón grisaceo pastel
			complementary: { 
			  primary: '#67A7A7', // Verde agua pastel
			  secondary: '#C8A772', // Ocre pastel
			}, 
			background1: { 
			  light: '#F1F3F6', // Gris azulado claro (fondo claro)
			  dark: '#2C2F36', // Azul gris oscuro (fondo oscuro)
			}, 
			background2: { 
			  light: '#FFFFFF', // Blanco puro para fondo claro
			  dark: '#1F2228', // Gris antracita oscuro
			}, 
			txt: { 
			  light: '#3C3C3C', // Gris oscuro para modo claro
			  dark: '#D1D1D1', // Gris claro para modo oscuro
			}, 
		  }, 
		}, 
	  }, 
	  darkMode: 'class', 
	  plugins: [], 
}
