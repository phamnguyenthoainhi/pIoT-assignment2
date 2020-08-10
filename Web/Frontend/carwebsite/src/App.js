import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store  from './store'
import { BrowserRouter, Route} from 'react-router-dom';
import themeFile from "./utils/theme";
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider } from '@material-ui/core/styles';
import sample from './components/sample/sample'
class App extends Component{
  render () {
    const theme = createMuiTheme(themeFile);
    return (
    <BrowserRouter>
      <Provider store={store}>
      <ThemeProvider theme={theme}>
      <Route exact path={'/'} render={(props) => <sample {...props} />} />
      </ThemeProvider>
        

        
      </Provider>
    </BrowserRouter>
    
    
  );
  }
  
}

export default App;
