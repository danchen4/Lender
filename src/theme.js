import { createMuiTheme } from '@material-ui/core/styles';

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

export const customTheme = createMuiTheme({
  palette: {
    common: {
      black: '#000',
      white: '#fff'
    },
    background: {
      paper: '#fff',
      'default': '#fafafa'
    },
    primary: {
      light: 'rgba(183, 185, 232, 1)',
      main: 'rgba(176, 178, 230, 1)',
      dark: 'rgba(160, 162, 210, 1)',
      contrastText: '#fff'
    },
    secondary: {
      light: 'rgba(139, 227, 248, 1)',
      main: 'rgba(114, 221, 247, 1)',
      dark: 'rgba(94, 181, 203, 1)',
      contrastText: '#fff'
    },
    error: {
      light: 'rgba(247, 41, 41, 1)',
      main: 'rgba(164, 49, 41, 1)',
      dark: '#d32f2f',
      contrastText: '#fff'
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.54)',
      disabled: 'rgba(0, 0, 0, 0.38)',
      hint: 'rgba(0, 0, 0, 0.38)'
    }
  }
});
