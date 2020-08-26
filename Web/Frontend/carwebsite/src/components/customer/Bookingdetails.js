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
        pickuptime: '',
        returntime: '',
        booking_id : "",
        car_id : "",
        user_id : "",
        status : "",
        
        
    }
}
      componentDidUpdate(prevProps) {
        if(this.props.car !== prevProps.car) {
            this.setState({
                car: this.props.car
            })
        }
        if(this.props.bookingStatus !== prevProps.bookingStatus && this.props.bookingStatus === 'success') {
          this.close()
          alert("Booking Success");
      } else {
        console.log("Failed")
      }
    }

    close = () => {
      this.props.handleClose()
    };
    onChange(e) {
       
      console.log(e.target.value)
      this.setState({
          [e.target.name] : e.target.value
      })
      
  }

    book = () => {
      var gapi = window.gapi
      var CLIENT_ID = "1011886611099-3tpug8k9tksko69s2s7bns0q74a9vkeg.apps.googleusercontent.com"
      var API_KEY = "AIzaSyCc23hisVCuVZTq3GNvfJGSWXlMr19feC8"
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"]
      var SCOPES = "https://www.googleapis.com/auth/calendar.events"
      
      gapi.load('client:auth2', () => {
        

        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        gapi.client.load('calendar', 'v3', () => console.log('bam!'))
        gapi.auth2.getAuthInstance().signIn()
        .then(() => 
        {
          var event = {
            'summary': 'Car Rent Pickup',
          'location': this.state.car.location,
          'description': 'Unlock a car',
          'start': {
            'dateTime': new Date(this.state.pickuptime),
            'timeZone': 'America/Los_Angeles'
          },
          'end': {
            'dateTime': new Date(this.state.returntime),
            'timeZone': 'America/Los_Angeles'
          },
          'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
          ],
          'attendees': [
           
          ],
          'reminders': {
            'useDefault': false,
            'overrides': [
              {'method': 'email', 'minutes': 24 * 60},
              {'method': 'popup', 'minutes': 10}
            ]
          }
          }
          var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event,
          })
  
          request.execute(event => {
            console.log(event)
            window.open(event.htmlLink)
          })
        })

      })
      const booking = {
      
        car_id : this.state.car.car_id,
        user_id : parseInt(sessionStorage.getItem('id')),
        status: "Booked",
        booking_date : this.state.pickuptime,
        return_date : this.state.returntime
      }
      
      // this.props.bookCar(booking)
      
    }

    render() {
      var date = new Date(this.state.pickuptime)

      console.log(date.toString())
        const {classes} = this.props;
        return (
            <div>

                <form className={classes.root} noValidate autoComplete="off">
                <h2>Booking Details</h2>
                
        <input type="datetime-local" id="meeting-time"
       name="pickuptime" value = {this.state.pickuptime}
      //  min="2018-06-07T00:00" max="2018-06-14T00:00" 
       onChange= {(e) => this.onChange(e)}/><br/>
       <input type="datetime-local" id="meeting-time"
       name="returntime" value = {this.state.returntime}
      //  min="2018-06-07T00:00" max="2018-06-14T00:00" 
       onChange= {(e) => this.onChange(e)}/>
                
                <br/>
                <Button variant="contained" color="primary" onClick = {() => this.book()} className={classes.savebtn}>Save</Button>
                <Button variant="contained" color="primary" onClick = {this.close} className={classes.savebtn}>Cancel</Button>
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