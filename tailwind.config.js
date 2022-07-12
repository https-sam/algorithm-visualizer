module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-md-green': '0px 0px 13px #2563E6',
      },
      colors: {
        "lightGreen": "#A2D476",
        "lightDark": "#20232A",
        "darkGray": "#282C34",
        "lightGray": "#33373E",
        "lightBlue": "#63DAF9",
        "transBlue": "#63dbf968",
        "dropdown": "#4f535a"
      },
      fontFamily: {
        "themeFont": ["Open Sans", "Helvetica", "Arial", "sans-serif"]
      }


    },
  },
  plugins: [],
  darkMode: 'class',
}