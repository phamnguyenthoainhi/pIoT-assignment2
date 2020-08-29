import React, { Component } from 'react';
import './App.css';
import {Provider} from 'react-redux';
import store  from './store'
import { BrowserRouter, Route} from 'react-router-dom';
import themeFile from "./utils/theme";
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { ThemeProvider } from '@material-ui/core/styles';

import Login from './components/authentication/Login';
import Signup from './components/authentication/Signup';
import Homepage from './components/authentication/Homepage';
import Carslist from './components/customer/Carslist';
import Dashboard from './components/customer/Dashboard';
import Bookingdetails from './components/customer/Bookingdetails';
import Carslistadmin from './components/admin/Carslistadmin';
import Rentalhistory from './components/admin/Rentalhistory';
import Userslist from './components/admin/Userslist';
import Reportedcars from './components/engineer/Reportedcars';
// import Map from './components/map/Map';
import Mymap from './components/map/Mymap';
class App extends Component{
  render () {
    const theme = createMuiTheme(themeFile);
    return (
    <BrowserRouter>
      <Provider store={store}>
      <ThemeProvider theme={theme}>
      <Route exact path={'/'} render={(props) => <Homepage {...props} />} />
      <Route exact path={'/login'} render={(props) => <Login {...props} />} />
      <Route exact path={'/signup'} render={(props) => <Signup {...props} />} />
      <Route exact path={'/customer/cars'} render={(props) => <Carslist {...props} />} />
      <Route exact path={'/customer/dashboard'} render={(props) => <Dashboard {...props} />} />
      <Route exact path={'/customer/booking'} render={(props) => <Bookingdetails {...props} />} />
      <Route exact path={'/admin/cars'} render={(props) => <Carslistadmin {...props} />} />
      <Route exact path={'/admin/history'} render={(props) => <Rentalhistory {...props} />} />
      <Route exact path={'/admin/users'} render={(props) => <Userslist {...props} />} />
      <Route exact path={'/engineer/reports'} render={(props) => <Reportedcars {...props} />} />
      {/* <Route exact path={'/map'} render={(props) => <Map google={this.props.google}
      center={{lat: 18.5204, lng: 73.8567}}
      hright='300px'
      zoom={15}
      {...props} />} />
      <Route exact path={'/test'} render={(props) => <Test {...props} />} /> */}
      <Route exact path={'/test'} render={(props) => <Mymap {...props} />} />


      </ThemeProvider>
        

        
      </Provider>
    </BrowserRouter>
    
    
  );
  }
  
}

export default App;
