import { createMuiTheme } from '@material-ui/core/styles';

export const MATERIAL_UI_THEME = {
  palette: {
    common: {
      black: '#000',
      white: '#fff',
    },
    background: {
      paper: '#fff',
      default: '#fafafa',
    },
    primary: {
      light: '#e8f5e9',
      main: '#c8e6c9',
      dark: '#97b498',
      contrastText: '#fff',
    },
    secondary: {
      light: '#63ccff',
      main: '#039be5',
      dark: '#006db3',
      contrastText: '#fff',
    },
    error: {
      light: '#ff77a9',
      main: '#ec407a',
      dark: '#d32f2f',
      contrastText: '#fff',
    },
    text: {
      primary: '#9e9e9e',
      secondary: '#cfcfcf',
      disabled: '#eeeeee',
      hint: '#e0e0e0',
    },
    typography: {
      fontFamily: ['Raleway', 'sans-serif'].join(','),
      fontSize: 16,
      htmlFontSize: 10,
      fontWeightLight: 400,
      fontWeightRegular: 500,
      fontWeightMedium: 600,
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': 'Raleway',
        },
      },
    },
  },
};

export const MUITheme = createMuiTheme(MATERIAL_UI_THEME);
