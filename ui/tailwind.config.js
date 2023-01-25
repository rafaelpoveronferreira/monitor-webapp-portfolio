/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}',
  './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#3378B9",
        "custom-gray": "#F6F6F6",
        "custom-border": "rgba(0,0,0,0.4)",
        "custom-red": "#F12F16"
      }
    },
  },
  plugins: [],
}
