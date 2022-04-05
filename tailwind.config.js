module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      minWidth: {
        sideBar: '22em',
      },
      maxWidth: {
        sideBar: '10em',
      },
      spacing: {
        contactFix: '1.05em',
      },
      borderColor: {
        inputBorder: '#D2D4E5',
        primaryBtnBorder: '#3F85ED',
      },
      textColor: {
        secondaryText: '#3C3C41',
        primaryText: '#3F85ED',
      },
      colors: {
        darkBlue: '#0C1223',
        lightGray: '#E8ECF2',
        primary: '#1B66D7',
        primaryBtn: '#1B66D7',
        secondaryBtn: '#3C3C41',
        customRed: '#ED3F3F',
        customOrange: '#ED933F',
      },
    },
  },
  plugins: [],
}
