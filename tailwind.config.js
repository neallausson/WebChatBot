module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    maxWidth: {
      xs: "20rem",
      sm: "24rem",
      md: "28rem",
      lg: "32rem",
      xl: "36rem",
      "2xl": "42rem",
      "3xl": "48rem",
      "4xl": "56rem",
      "5xl": "64rem",
      "6xl": "72rem",
      "7xl": "80rem",
      "8xl": "100rem",
    },
    extend: {
      fontFamily: {
        compactBlack: ['RightGroteskCompactBlack', 'sans-serif'],
        medium: ['RightGroteskMedium', 'sans-serif'],
        narrowLight: ['RightGroteskNarrowLight', 'sans-serif'],
        spatialBlack: ['RightGroteskSpatialBlack', 'sans-serif'],
        tallFine: ['RightGroteskTallFine', 'sans-serif'],
        tightMedium: ['RightGroteskTightMedium', 'sans-serif'],
        wideMedium: ['RightGroteskWideMedium', 'sans-serif'],
      },
      colors: {
        primary: "#FC9B0E",
        secondary: "#C20EFC",
      },
      spacing: {
        88: "22rem",
        128: "32rem",
        "130%": "130%",
      },
      /*backgroundImage: {
        arena: "url('public/assets/LOP/arena.png')",
      },*/
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
      "3xl": "1920px",
    },
  },
  variants: {
    scrollbar: ["rounded", "responsive"],
  },
  // eslint-disable-next-line global-require
  plugins: [require("tailwind-scrollbar")],
};
