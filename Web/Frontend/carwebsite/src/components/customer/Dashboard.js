import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from "react-redux";
import style from './style';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Navigationbar from './Navigationbar';
import {getBookingsbyUserid, cancelBooking, unlock, lock} from '../../actions/userAction';
import Grid from '@material-ui/core/Grid';
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: []
            
        }
    }
    componentDidMount() {
        
        if ( sessionStorage.getItem("id") !== undefined & sessionStorage.getItem("id") !== '' & sessionStorage.getItem("id") !== null) {
            this.props.getBookingsbyUserid(sessionStorage.getItem("id"))

        } else {
            this.props.history.push("/")
        }
    }

    componentDidUpdate(prevProps) {
        
        if(this.props.bookings !== prevProps.bookings) {
            this.setState({
                bookings: this.props.bookings
            })
        }    
    }
    dateConvert = (date) => {
        const mydate = new Date(date)
        const string = mydate.getDate() + "-" + mydate.getMonth() + "-" + mydate.getFullYear() 
        // + " " + mydate.getHours()+ ":" + mydate.getMinutes()
        
        return string
    }
    cancelbooking = (booking) => {
        
        this.props.cancelBooking(booking.booking)
    }
    unlock = (booking) => {
        
        this.props.unlock(booking.booking)
    }
    lock = (booking) => {
        
        this.props.lock(booking.booking)
    }

    displayLock = (startDate, endDate) => {
        var today = new Date()
        if (today >= new Date(startDate) && today <= new Date(endDate)) {
            
            return true
        } else {
            return false
        }
    }
    displayCancel = (startDate, endDate) => {
        var today = new Date()
        if (today < new Date(startDate)) {
            return true
        } else {
            return false
        }
    }

    render() {
        const {classes} = this.props;
       
        console.log(this.state.bookings)
        return (
            <div>
                <Navigationbar/>
               
                <Grid container className={classes.root} spacing={3}>
                {this.state.bookings ? 
                (this.state.bookings.map((booking) => 
                <Grid item lg={6} md= {6} sm = {12} xs={12} key={booking.booking_id}>
                    <Card className={classes.bookingcard}>
                        <CardContent>
                        <List className={classes.root}>
                            <ListItem>
                                <ListItemAvatar>
                                <Avatar className={classes.avatar}>
                                    <img src="https://image.flaticon.com/icons/svg/3089/3089803.svg" width="90%" height="90%" alt="Logo" style={{paddingTop :"0px"}}/>

                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Car Information"  />
                               
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem>
                                <ListItemAvatar>
                               
                                </ListItemAvatar>
                                <ListItemText  secondary={`Car Make: ${booking.car.make}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                               
                                </ListItemAvatar>
                                <ListItemText  secondary={`Car Body Type: ${booking.car.make}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                               
                                </ListItemAvatar>
                                <ListItemText  secondary={`Color: ${booking.car.make}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                               
                                </ListItemAvatar>
                                <ListItemText  secondary={`Seats: ${booking.car.make}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                               
                                </ListItemAvatar>
                                <ListItemText  secondary={`Location: ${booking.car.make}`} />
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                               
                                </ListItemAvatar>
                                <ListItemText  secondary={`Cost/hour: ${booking.car.make}`} />
                            </ListItem>
                            <ListItem>
                                    <ListItemAvatar>
                                    <Avatar className={classes.avatar}>
                                        <img src="https://image.flaticon.com/icons/svg/428/428425.svg" width="70%" height="70%" alt="Logo" style={{paddingTop :"0px"}}/>

                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary="Booking Information"  />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem>
                                    <ListItemAvatar>
                                
                                    </ListItemAvatar>
                                    <ListItemText  secondary={`Pickup Date: ${this.dateConvert(booking.booking_date)}`} />
                            
                            </ListItem>
                            <ListItem>
                                    <ListItemAvatar>
                                
                                    </ListItemAvatar>
                                    <ListItemText  secondary={`Return Date: ${this.dateConvert(booking.return_date)}`} />
                            
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            <ListItem>
                                    <ListItemAvatar>
                                
                                    </ListItemAvatar>
                                    {this.displayCancel(booking.booking_date) === true ?
                            (<CardActions>
                                <Button size="small" className={classes.canelbutton} onClick= {() => this.cancelbooking({booking})}>Cancel This Booking</Button>
                            </CardActions>)
                            :
                            (null)}
                            
                            </ListItem>
                            <ListItem>
                                    <ListItemAvatar>
                                
                                    </ListItemAvatar>
                                    {this.displayLock(booking.booking_date, booking.return_date) === true ? 
                            (<CardActions>
                                {booking.car.locked === 0 ? (<Button size="small" className={classes.lockbutton} onClick= {() => this.lock({booking})}>Lock</Button>):(<Button size="small" className={classes.unlockbutton} onClick= {() => this.unlock({booking})}>Unlock</Button>)}
                                
                            </CardActions>)
                            :
                            (null)
                            }
                            
                            </ListItem>
                            
                        </List>
                        
                        </CardContent>
                            
                            
                            
                
            </Card> 
                    </Grid>
                
                
                ))
                :
                (null)}
                </Grid>    
                
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    getBookingsbyUserid: (user_id) => dispatch(getBookingsbyUserid(user_id)),
    cancelBooking: (booking_id) => dispatch(cancelBooking(booking_id)),
    unlock: (booking) => dispatch(unlock(booking)),
    lock: (booking) => dispatch(lock(booking)),
   
  
})

const mapStateToProps = state => ({
    
    bookings: state.userReducer.bookings,

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Dashboard));
