import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import green from '@material-ui/core/colors/green';
import pink from '@material-ui/core/colors/pink';
import orange from '@material-ui/core/colors/orange';
import amber from '@material-ui/core/colors/amber';
import purple from '@material-ui/core/colors/purple';
import  createMuiTheme, { ThemeOptions } 
  from '@material-ui/core/styles/createMuiTheme'

import TopNavBar from './components/TopNavBar';
import MyMovies from './components/MyMovies';
import './App.scss';


const themeOptions: ThemeOptions = {
  palette: {
    primary: pink,
    type: 'dark'
  }
};

const theme = createMuiTheme(themeOptions);

export default function App() {
  return (
    <ThemeProvider theme={theme} >
      {/* CssBaseLine must be inside ThemeProvider to enable 'dark' theme */}
      <CssBaseline />  
      <div className="App">
        <TopNavBar />
        <MyMovies />
      </div>
    </ThemeProvider>
  );
}