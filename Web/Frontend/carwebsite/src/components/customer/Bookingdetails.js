import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from "react-redux";
// import { Link } from "react-router-dom";
import style from './style';
// import TextField from '@material-ui/core/TextField';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import {bookCar} from '../../actions/carAction'

class Bookingdetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
        car: {},
        
    }
}
      componentDidUpdate(prevProps) {
        if(this.props.car !== prevProps.car) {
            this.setState({
                car: this.props.car
            })
        }
        if(this.props.bookingStatus !== prevProps.bookingStatus && this.props.bookingStatus === 'success') {
          console.log("Success")
      } else {
        console.log("Failed")
      }
    }

    close = () => {
      this.props.handleClose()
    };

    book = () => {
      const booking = {
        car_id: this.state.car.id,
        user_id: 1,
        start_day: '',
        end_day:''
      }
      this.props.bookCar(booking)
    }

    render() {
      console.log(this.state.car)
        const {classes} = this.props;
        return (
            <div>
<Button variant="contained" color="primary" onClick = {this.close}>Close</Button>
                <form className={classes.root} noValidate autoComplete="off">
                <h2>Booking Details</h2>
                
        <input type="datetime-local" id="meeting-time"
       name="meeting-time" value="2018-06-12T19:30"
       min="2018-06-07T00:00" max="2018-06-14T00:00"/><br/>
       <input type="datetime-local" id="meeting-time"
       name="meeting-time" value="2018-06-12T19:30"
       min="2018-06-07T00:00" max="2018-06-14T00:00"/>
                
                <br/>
                <Button variant="contained" color="primary" onClick = {() => this.book()}>Save</Button>
                </form>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    bookCar: (booking) => dispatch(bookCar(booking)),
   
  
})

const mapStateToProps = state => ({
  bookingStatus: state.customerReducer.bookingStatus,

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Bookingdetails));