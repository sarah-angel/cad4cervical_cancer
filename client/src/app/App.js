import React from 'react';
import MainRouter from './MainRouter'
import { BrowserRouter } from 'react-router-dom'
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';

function App() {

  const theme = createMuiTheme({
    
  })

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </BrowserRouter>
      
  );
}

export default App;
