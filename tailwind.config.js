/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'beige-1': '#a19482',
        'beige-2': '#bcaf9c',
        'beige-3': '#d8cab7',
        'green-1': '#2d3e48', // Darkest green, almost black
        'green-2': '#388073', // Mid-tone green
        'green-3': '#5bcdb6', // Lightest, vibrant green
        'blue': '#154270',    // Deep blue
        'white': '#f0f0f0',   // Custom white
        'black': '#101010',   // Custom black
      },
      fontFamily: {
        // 'Nourd' would need to be imported into your project (e.g., via @font-face or Google Fonts link)
        // and then you could use 'font-nourd' in your components.
        // For now, it's commented out as an example.
        // nourd: ['Nourd', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'], // Added Poppins to Tailwind's font family
      },
    },
  },
  plugins: [],
}
