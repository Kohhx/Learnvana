/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      "proj-blue1": {
        300: "#40747f",
      },
      "proj-blue2": {
        300: "#3e8492",
      },
      "proj-blue3": {
        300: "#6c98a2",
      },
      "proj-white1": {
        300: "#f8f8f8",
      },
      "proj-white2": {
        300: "#6c98a2",
      },
      "proj-white3": {
        300: "#E8E8E8",
      },
      "proj-black1": {
        300: "#000000",
      },
      "proj-grey1": {
        300: "#585858",
      },
    },
    fontFamily: {
      'kaisei': ['Kaisei Tokumin', 'serif']
    }
  },
  plugins: [],
};
