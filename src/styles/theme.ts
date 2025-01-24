import { extendTheme } from '@mui/material/styles'

export const demoTheme = extendTheme({
  defaultColorScheme: 'light', // ou 'dark'
  cssVarPrefix: 'mui', // ou outro prefixo
  colorSchemeSelector: 'class', // usa classes como .mode-light e .mode-dark
  rootSelector: ':root', // ou ':host' para Shadow DOM
  disableCssColorScheme: false,
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#003C30', // cor principal
        },
        secondary: {
          main: '#D1F811', // cor secundária
        },
        background: {
          default: '#C0D8D8', // cor de fundo
          paper: '#C0D8D8', // cor de fundo dos elementos
        },
        text: {
          primary: '#000000', // cor do texto principal
          secondary: '#003C30', // cor do texto secundário
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#003C30',
        },
        secondary: {
          main: '#D1F811',
        },
        background: {
          default: '#C0D8D8',
        },
        text: {
          primary: '#fff', // cor do texto principal no tema dark
        },
      },
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          backgroundColor: '#003C30', // cor de fundo do botão
          color: '#fff', // cor do texto do botão
        },
      },
    },
  },
})
