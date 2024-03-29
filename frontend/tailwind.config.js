/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
        '17': 'repeat(17, minmax(0, 1fr))',
      },
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
        "proj-blue5": {
          300: "#86BDC0",
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
          100: "#d1d1d1",
          300: "#585858",
        },
        "proj-grey2": {
          200: "#AFAFAF",
          300: "#A1A1A1",
        },
        "proj-grey3": {
          300: "#696969",
          400: "#616161",
          500: "#848484"
        },
        "proj-grey4": {
          300: "#DADADA",
        },
        "proj-orange1": {
          300: "#DFBCA4",
        },
        "proj-red1": {
          300: "#D2929A",
        },
      },
    },

    fontFamily: {
      kaisei: ["Kaisei Tokumin", "serif"],
      inter: ["Inter", "sans-serif"],
    },
  },
  plugins: [
    require('tailwindcss'),
    require('tailwind-scrollbar-hide'),
    require('autoprefixer'),
  ]
};
