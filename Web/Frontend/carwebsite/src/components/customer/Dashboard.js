import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from "react-redux";
import style from './style';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Navigationbar from './Navigationbar';
import {getBookingsbyUserid, cancelBooking} from '../../actions/userAction';
import Grid from '@material-ui/core/Grid';
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: []
            
        }
    }
    componentDidMount() {
        
        if ( sessionStorage.getItem("id") !== undefined) {
            this.props.getBookingsbyUserid(sessionStorage.getItem("id"))

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
        const string = mydate.getDate() + "-" + mydate.getMonth() + "-" + mydate.getFullYear() + " " + mydate.getHours()+ ":" + mydate.getMinutes()
        
        return string
    }
    cancelbooking = (booking) => {
        console.log(booking.booking.booking_id)
        this.props.cancelBooking(booking.booking)
    }

    render() {
        const {classes} = this.props;
        const mydate = new Date("2020-08-30T13:36")
        // console.log(mydate.getDate())
        
        return (
            <div>
                <Navigationbar/>
               
                <Grid container className={classes.root} spacing={2}>
                {this.state.bookings ? 
                (this.state.bookings.map((booking) => 
                <Grid item lg={6} md= {6} sm = {12} xs={12} key={booking.booking_id}>
                    <Card className={classes.bookingcard}>
                <CardContent>
                <Typography className={classes.bookingtitle} color="textSecondary" gutterBottom>
                    Booking id : {booking.booking_id}
                    </Typography>
                    <Typography variant="body2" component="p">
                    Car id : {booking.car_id}
                    </Typography>
                    <Typography variant="body2" component="p">
                    Pickup Date: {this.dateConvert(booking.booking_date)}
                    </Typography>
                    <Typography variant="body2" component="p">
                    Return Date: {this.dateConvert(booking.return_date)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" className={classes.button} onClick= {() => this.cancelbooking({booking})}>Cancel This Booking</Button>
                </CardActions>
                <CardActions>
                    <Button size="small" className={classes.button} >Unlock</Button>
                </CardActions>
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
   
  
})

const mapStateToProps = state => ({
    
    bookings: state.userReducer.bookings,

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Dashboard));
