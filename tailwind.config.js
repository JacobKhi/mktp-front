/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#67e8f9",
          DEFAULT: "#06b6d4",
          dark: "#0e7490",
        },
        secondary: {
          light: "#fde047",
          DEFAULT: "#facc15",
          dark: "#eab308",
        },
      },
    },
  },
  plugins: [],
};
