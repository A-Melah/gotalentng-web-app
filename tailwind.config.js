/** @type {import('tailwindcss').Config} */
export default { // Note: 'export default' for ES Modules in Vite
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        fontFamily: {
            inter: ['Inter', 'sans-serif'], // Add Inter font
        },
    },
  },
  plugins: [],
}