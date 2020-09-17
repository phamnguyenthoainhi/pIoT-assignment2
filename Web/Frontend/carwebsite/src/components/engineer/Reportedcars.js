import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from "react-redux";
import style from './style.js';
import {fetchReport} from '../../actions/engineerAction';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { GoogleApiWrapper,  Marker  } from 'google-maps-react';
import MapLoader from '../map/Map';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
class Reportedcars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: [],
        }
    }
    componentDidUpdate(prevProps) {
        // console.log(this.props.reports)
        if(this.props.reports !== prevProps.reports) {
            this.setState({
                reports: this.props.reports,
                searchedreports : this.state.reports  
                
            })
        }
    }
    logout = () => {
        sessionStorage.removeItem("id")
        sessionStorage.removeItem("role")
        
    }
    displayMarkers = (car) => {
        // return this.state.stores.map((store, index) => {
          return <Marker key={car.car_id} id={car.car_id} position={{
           lat: car.latitude,
           lng: car.longitude
         }}
        //  onClick={() => console.log("You clicked me!")} 
         />
        // })
      }

    componentDidMount() {
        if (sessionStorage.getItem("id") === null) {
            
            this.props.history.push("/")
        }
        this.props.fetchReport()
        
        
    }
    render() {
        
        const {classes} = this.props;
        return (
            <div>
                <div className='navigationbar'>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                {/* <a className="nav-link" href="/customer/cars"></a> */}
                                </li>
                                <li className="nav-item active">
                                    {/* <a className="nav-link" href="/customer/dashboard">Dashboard</a> */}
                                    
                                </li>
                                
                                </ul>
                                <form className="form-inline my-2 my-lg-0">
                                    {sessionStorage.getItem("id") !== null ? (<Button className={classes.buttonLogout} onClick={()=> this.logout()} component={Link} to='/'>Logout</Button>):(<Button className={classes.buttonLogout} onClick={()=> this.logout()} component={Link} to='/'>Login</Button>)}
                                {/* <Button className={classes.buttonLogout} onClick={()=> this.logout()} component={Link} to='/'>Logout</Button><br/> */}
                                </form>
                            </div>
                    </nav>
                </div>
                {/* {sessionStorage.getItem('role')} */}
                <div>
                <Grid container className={classes.root} spacing={3}>
                    {this.state.reports ? (
                        this.state.reports.map((report) => 
                        <Grid item lg={6} md= {12} xs={12} key={report.report_id}>
                        <Card className={classes.card} variant="outlined">
                        <List className={classes.list}>
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar className={classes.avatar}>
                                    <img src="https://image.flaticon.com/icons/svg/744/744465.svg" width="90%" height="90%" alt="Logo" style={{paddingTop :"0px"}}/>

                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Car Information"  />
                               
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem>
                                <ListItemAvatar>
                               
                                </ListItemAvatar>
                                <ListItemText  secondary={`Car Make: ${report.car.make}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                               
                                </ListItemAvatar>
                                <ListItemText  secondary={`Car Body Type: ${report.car.make}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                               
                                </ListItemAvatar>
                                <ListItemText  secondary={`Color: ${report.car.make}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                               
                                </ListItemAvatar>
                                <ListItemText  secondary={`Seats: ${report.car.make}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                               
                                </ListItemAvatar>
                                <ListItemText  secondary={`Location: ${report.car.make}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                               
                                </ListItemAvatar>
                                <ListItemText  secondary={`Cost/hour: ${report.car.make}`} />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar className={classes.avatar}>
                                    <img src="https://image.flaticon.com/icons/svg/3448/3448362.svg" width="90%" height="90%" alt="Logo" style={{paddingTop :"0px"}}/>

                                    </Avatar>
                                </ListItemAvatar>
                                
                                <ListItemText primary="Report Information"  />
                               
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                               
                                </ListItemAvatar>
                                <ListItemText  secondary={`Problem Description: ${report.content}`} />
                            </ListItem>
                        </List>
                        
                        <CardContent>
                        {/* Report: {report.report_id}
                        <br/>
                        Car: {report.car_id}
                        <br/>
                        Content: {report.content} */}
                        <MapLoader car={report.car}/>
                        </CardContent>
                        
                        {/* <CardMedia>
                        
                        </CardMedia> */}
    
                    </Card>
                        </Grid>
                        )
                    ):null}
                   
                    
                </Grid>
                </div>
               
               

                
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    fetchReport: () => dispatch(fetchReport()),
})

const mapStateToProps = state => ({
  reports: state.engineerReducer.reports,

});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Reportedcars));
GoogleApiWrapper({
    apiKey: 'AIzaSyCc23hisVCuVZTq3GNvfJGSWXlMr19feC8'
  })(Reportedcars);