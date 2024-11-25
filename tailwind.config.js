/** @type {import('tailwindcss').Config} */
export default {
   content: [
      "./index.html",
      "./src/**/*.{vue,js,ts,jsx,tsx}",
   ], theme: {
      extend: {},
      colors: {
         background: '#f8f8ec',
         table2: '#e2e6c1',
         limao: '#aedd2b',
         limao2: '#8acd1b',
         azul1: '#066699',
         azul2: '#0a5483',
         azul3: '#02416d',
         azul4: '#2196F3',
         cinza: '#90A4AE',
         preto: '#000',
         preto2: '#1a1b1c',
         branco: '#fff',
         vermelho: '#F44336',
         vermelho2: '#9d3226',
         vermelho3: '#6c1919',
         verde: '#0f440f',
      }
   },
   plugins: [],
}

