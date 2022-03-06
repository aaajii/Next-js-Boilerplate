module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        aliceBlue: '#ECF5FF',
        antiqueWhite: '#FFF2DF',
        brightNavyBlue: '#2C7BDB',
        creamOrange: '#FFF5EC',
        eltonGreen: '#7DCC9F',
        iron: '#d3d4d4',
        darkerIron: '#caccce',
        grayLighter: '#E6E6E6',
        lightBlueGray: '#EFF2F3',
        linen: '#FFEEE2',
        mintGreen: '#F1F8F5',
        lightGreen: '#0BA24A',
        oldLace: '#FFFAEB',
        primary: '#FF7E00',
        purpleLighter: '#949FBF',
        seaShell: '#FFF2EF',
        selectiveYellow: '#F8B800',
        yellowPeel: '#FFA421',
        wildSand: '#F6F6F6',
        floralWhite: '#FDFCF1',
        // Solana Colors https://brandpalettes.com/solana-colors/
        'sol-green': { DEFAULT: '#00FFA3' },
        'sol-blue': { DEFAULT: '#03E1FF' },
        'sol-purple': { DEFAULT: '#DC1FFF' },
        'sol-black': { DEFAULT: '#101921' },
      },
    },
    screens: {
      'mobile-xs': '320px',
      'mobile-m': '375px',
      'mobile-l': '425px',
      sm: '640px', // => @media (min-width: 640px) { ... }
      md: '768px', // => @media (min-width: 768px) { ... }
      lg: '1024px', // => @media (min-width: 1024px) { ... }
      xl: '1280px', // => @media (min-width: 1280px) { ... }
      xxl: '1440px', // => @media (min-width: 1440px) { ... }
      '3xl': '1680px', // => @media (min-width: 1680px) { ... }
      '4xl': '1920px', // => @media (min-width: 1920px) { ... }
      '5xl': '2560px', // => @media (min-width: 1920px) px{ ... }
    },
    fontFamily: {
      eina03: ['Eina03', 'sans-serif'],
      rubik: ['Rubik', 'sans-serif'],
    },
    keyframes: {
      'fade-in-down': {
        '0%': {
          opacity: '0',
          transform: 'translateY(-10px)',
        },
        '100%': {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
    },
    animation: {
      'fade-in-down': 'fade-in-down 0.5s ease-out',
    },
  },
  plugins: [],
};
