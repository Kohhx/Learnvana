/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "proj-blue1": {
          300: "#40747f",
        },
        "proj-blue2": {
          300: "#3e8492",
          100: "#2e656f",
        },
        "proj-blue3": {
          300: "#6c98a2",
        },
        "proj-blue4": {
          200: "#78B2B5",
          300: "#6D9395",
        },
        "proj-white1": {
          300: "#f8f8f8",
        },
        "proj-white2": {
          300: "#6c98a2",
        },
        "proj-white3": {
          200: "#F1F1F1",
          300: "#FFFFFF",
        },
        "proj-white4": {
          200: "#E4E4E4",
          300: "#E8E8E8",
        },
        "proj-black1": {
          300: "#000000",
        },
        "proj-black2": {
          300: "#3B3B3B",
        },
        "proj-grey1": {
          300: "#585858",
          100: "#d1d1d1",
        },
        "proj-grey2": {
          300: "#A1A1A1",
        },
        "proj-grey3": {
          300: "#696969",
        },
      },
    },

    fontFamily: {
      kaisei: ["Kaisei Tokumin", "serif"],
    },
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ]
};
