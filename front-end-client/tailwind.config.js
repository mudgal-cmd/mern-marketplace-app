/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'custom-bounce': 'bounce 0.8s ease-in-out 0.8s infinite'
      }
    },
  },
  plugins: [],
}