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
import DatePicker from "react-datepicker";
import {bookCar} from '../../actions/carAction'
import {getBookingDates, getReturnDates} from '../../actions/userAction'

class Bookingdetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
        car: {},
        pickuptime: null,
        returntime: null,
        booking_id : "",
        car_id : "",
        user_id : "",
        status : "",
        today: '',
        booking_dates: [],
        return_dates: [],
        startDate: "",
        excludeDates: []
        
        
    }
    this.onChangepickup = this.onChangepickup.bind(this);
    this.onChangereturn = this.onChangereturn.bind(this);
}
      componentDidUpdate(prevProps) {
        if(this.props.car !== prevProps.car) {
            this.setState({
                car: this.props.car
            })
            this.props.getBookingDates(this.props.car)
            this.props.getReturnDates(this.props.car)
        }
        if(this.props.booking_dates !== prevProps.booking_dates) {
          this.setState({
              booking_dates: this.props.booking_dates
          })
      }
      if(this.props.return_dates !== prevProps.return_dates) {
        this.setState({
            return_dates: this.props.return_dates
        })
      }
        if(this.props.return_dates !== prevProps.return_dates || this.props.booking_dates !== prevProps.booking_dates) {
          this.setState({
              return_dates: this.props.return_dates,
              booking_dates: this.props.booking_dates
          })


    }
        if(this.props.bookingStatus !== prevProps.bookingStatus && this.props.bookingStatus === 'success') {
          this.close()
          alert("Booking Success");
      } else {
        console.log("Failed")
      }
    }
    componentDidMount() {
      
      var today = new Date()
      this.setState({
        today
      })

      
    }

    close = () => {
      this.props.handleClose()
    };
    
      onChangepickup(date) {
        
        this.setState({
          pickuptime: date
        })
      }
      onChangereturn(date) {
        
        this.setState({
          returntime: date
        })
      }
      
  // }

    book = () => {
      if (this.state.pickuptime !== undefined && this.state.pickuptime !== ''&& this.state.pickuptime !== null && this.state.returntime !== undefined && this.state.returntime !== ''&& this.state.returntime !== null) {

     
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
      console.log(booking)
      
      this.props.bookCar(booking)
    } else {
      console.log(this.state.pickupdate)
      alert("Please choose pickup date and return date")
    }
      
  }
    convert = (string_array) => {
      var date_array = []
      string_array.forEach(item => 
        // item = new Date(item);
        date_array.push(new Date(item))
        )
        return date_array

    }
    mergearray = (arr1, arr2) => {
      arr1 = this.convert(arr1)
      arr2 = this.convert(arr2)
      var arr3 = arr1.concat(arr2)
      return (arr3)
    }
   
    render() {
    //  console.log(this.state.excludeDates)
    //  this.mergearray(this.state.return_dates, this.state.bookings_dates)
    //  console.log(this.state.return_dates)
    //  console.log(this.state.returntime)
    var a1 = this.state.booking_dates
    var a2 = this.state.return_dates
    this.mergearray(a1, a2)
    
        const {classes} = this.props;
        return (
            <div>

                <form className={classes.root} noValidate autoComplete="off">
                <h2>Booking Details</h2>
                
        {/* <input type="datetime-local" id="meeting-time"
       name="pickuptime" value = {this.state.pickuptime} required
       min={this.state.today} max={this.state.returntime}
       onChange= {(e) => this.onChange(e)}/><br/>
       <input type="datetime-local" id="meeting-time"
       name="returntime" value = {this.state.returntime} required
       min={this.state.pickuptime} max=""
       onChange= {(e) => this.onChange(e)}/> */}
       <DatePicker
      showTimeSelect
      selected = {this.state.pickuptime}
      onChange={ this.onChangepickup }
      name='pickuptime'
      excludeDates={this.mergearray(a1, a2)}
      value = {this.state.pickuptime}
      minDate={this.state.today}
      maxDate={this.state.returntime}
      required
      
    />
    <br/>
    <DatePicker
      showTimeSelect
      selected = {this.state.returntime}
      onChange={ this.onChangereturn }
      name='pickuptime'
      excludeDates={this.mergearray(a1, a2)}
      value = {this.state.returntime}
      minDate={this.state.pickuptime} 
      
    />
                
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
    getBookingDates: (car) => dispatch(getBookingDates(car)),
    getReturnDates: (car) => dispatch(getReturnDates(car)),
   
  
})

const mapStateToProps = state => ({
  bookingStatus: state.customerReducer.bookingStatus,
  booking_dates: state.customerReducer.booking_dates,
  return_dates: state.customerReducer.return_dates,

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Bookingdetails));