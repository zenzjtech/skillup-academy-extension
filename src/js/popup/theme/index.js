import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: 'rgb(247, 249, 252)', //colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: '#1976d2'
    },
    secondary: {
      main: '#1976d2'
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    }
  },
  shadows,
  typography
});

export default theme;
