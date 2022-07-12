module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-md-green': '0px 0px 13px #1DA351',
      },
      colors: {
        "lightGreen": "#A2D476",
        "lightDark": "#20232A",
        "darkGray": "#282C34",
        "lightGray": "#33373E",
        "lightBlue": "#63DAF9"
      }

    },
  },
  plugins: [],
  darkMode: 'class',
}