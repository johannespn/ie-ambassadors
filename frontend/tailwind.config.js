/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        beige: {
          300: "#F3EACD4D",
          500: "#F3EACD80",
          700: "#F3EACDB2",
          900: "#F3EACD",
        },
        blue: {
          100: "#06066E4D",
          300: "#06066E80",
          500: "#06066EB2",
          700: "#06066E",
          900: "#040845",
        },
        orange: {
          300: "#DF72004D",
          500: "#DF720080",
          700: "#DF7200B2",
          900: "#DF7200",
        },
        electric: {
          300: "#10069F4D",
          500: "#10069F80",
          700: "#10069FB2",
          900: "#10069F",
        },
        red: {
          300: "#CF45204D",
          500: "#CF452080",
          700: "#CF4520B2",
          900: "#CF4520",
        },
        lightBrown: "#E4DED4",
        lightGray: "#C4C4C4",
        darkGray: "#5D5D5F",
      },
      fontFamily: {
        sans: ["Fedra Sans", ...defaultTheme.fontFamily.sans],
        serif: ["Fedra Serif", ...defaultTheme.fontFamily.serif],
        arial: ["Arial"],
      },
    },
  },
};
