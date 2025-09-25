/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Crucial: Scans all your component files!
  ],
  theme: {
    extend: {
      fontFamily: {
        // Ensuring 'Inter' is available as a utility
        sans: ['Inter', 'sans-serif'],
      },
      // You can define custom colors here, like your FixMyCity blue
      colors: {
        'city-blue': '#3b82f6', 
      }
    },
  },
  plugins: [],
}