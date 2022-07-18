module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      boxShadow: {
        'custom-md-blue': '0px 0px 10px #A2D476',
        'custom-md-lightBlue': '0px 0px 10px #15A5E5'
      },
      colors: {
        "lightGreen": "#A2D476",
        "lightDark": "#20232A",
        "darkGray": "#282C34",
        "lightGray": "#33373E",
        "lightBlue": "#63DAF9",
        "lightBlue2": "#15A5E5",
        "transBlue": "#63dbf968",
        "dropdown": "#4f535a",
        "richBlue": "#0B1120",
        "textGray": "#94A3B7",
        "homeGray": "#121824"
      },
      fontFamily: {
        "themeFont": ["Open Sans", "Helvetica", "Arial", "sans-serif"],
        "spline": ['Spline Sans', "sans-serif"]
      }


    },
  },
  plugins: [],
  darkMode: 'class',
}