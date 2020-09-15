import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from "react-redux";

import style from './style';
import Button from '@material-ui/core/Button';
import DatePicker from "react-datepicker";
import {bookCar} from '../../actions/carAction'
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import {getBookingDates, getReturnDates} from '../../actions/userAction'
import {fetchRentalHistory} from '../../actions/adminAction';

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
        excludeDates: [],
        rentalhistory: [],
        total : 0
        
        
        
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
    if(this.props.rentalhistory !== prevProps.rentalhistory) {
      this.setState({
        rentalhistory: this.props.rentalhistory,
        
          
         
          
      })
      var dateArray = []
      this.props.rentalhistory.forEach(function(booking) {
        
      // bookings.forEach(function(booking) {
        // console.log("test should be 6")
        var currentDate = new Date(booking.booking_date);
        var endDate = new Date(booking.return_date);
        while (currentDate < endDate) {
          dateArray.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1)
          
        }
        dateArray.push(new Date(endDate))
        
        

      })
      this.setState({
          excludeDates: dateArray
        })
      // console.log(dateArray)
     
  }
        if(this.props.bookingStatus !== prevProps.bookingStatus && this.props.bookingStatus === 'success') {
          this.close()
          alert("Booking Success");
          this.props.fetchRentalHistory()
      } else {
        
      }
    }
    componentDidMount() {
      this.props.fetchRentalHistory()
      var today = new Date()
      this.setState({
        today,
        pickuptime: null,
        returntime: null
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

      getTime = (date) => {
        var time = []
        time.push(date.getHours())
        time.push(date.getMinutes())
        
      }

      getDates = (startDate, endDate) => {
        var dateArray = []
        var currentDate = startDate;
        while (currentDate < endDate) {
          dateArray.push(new Date(currentDate));
          currentDate.setDate(new Date(currentDate).getDate() + 1)
          console.log(currentDate)
        }
        
        return dateArray
      }
      
  

    book = () => {
      
      console.log(this.state.returntime)
      if (this.state.pickuptime !== null && this.state.returntime !== null) {
        // console.log("not null")
        var pickupTime = this.state.pickuptime.toISOString()
        var returnTime = this.state.returntime.toISOString()
     
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
        gapi.client.load('calendar', 'v3', () => console.log(''))
        gapi.auth2.getAuthInstance().signIn()
        .then(() => 
        {
          var event = {
            'summary': 'Car Rent Pickup',
          'location': this.state.car.location,
          'description': 'Unlock a car',
          'start': {
            'dateTime': pickupTime,
            'timeZone': 'America/Los_Angeles'
          },
          'end': {
            'dateTime': returnTime,
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
      
      var total = this.calculateTotal(this.state.pickuptime, this.state.returntime, this.state.car.cost)
      
      const booking = {
      
        car_id : this.state.car.car_id,
        user_id : parseInt(sessionStorage.getItem('id')),
        status: "Booked",
        booking_date : this.state.pickuptime,
        return_date : this.state.returntime,
        price : total
      }
      
      
      
      
      this.props.bookCar(booking)
      this.setState({
        
        pickuptime: null,
        returntime: null
      })
      
    } else {
      console.log(this.state.pickupdate)
      alert("Please choose pickup date and return date")
    }
      
  }
    convert = (string_array) => {
      var date_array = []
      var time = []
      
      string_array.forEach(function (item) {
        date_array.push(new Date(item));
        time.push(new Date(item).getHours())
        time.push(new Date(item).getMinutes())
    });
        
        return date_array

    }
    calculateTotal = (startDate, endDate, cost) => {
      
      var datecount = Math.round((new Date(endDate)-new Date(startDate))/(1000*60*60*24));
      cost = parseInt(cost)
      var total = cost * datecount
      return total
    }


   
    render() {

      // this.calculateTotal (this.state.pickuptime, this.state.returntime, this.state.car.cost)
      // console.log("2020-09-09T09:00:00-07:00" == new Date())
      // if (this.state.pickuptime !== null) {
      //   console.log(this.state.pickuptime.toISOString())

      // }
        const {classes} = this.props;
        return (
            <div className={classes.formroot}>

                <form  noValidate autoComplete="off">
                <h2>Booking Details</h2>
                
      
       <DatePicker
       className={classes.dateinput}
      showTimeSelect
      selected = {this.state.pickuptime}
      onChange={ this.onChangepickup }
      name='pickuptime'
      
      excludeDates={this.state.excludeDates}
      value = {this.state.pickuptime}
      minDate={this.state.today}
      maxDate={this.state.returntime}
      timeFormat="HH:mm"
      timeIntervals={60}
      timeCaption="time"
      dateFormat="MMMM d, yyyy h:mm aa"
      placeholderText="Choose pickup time"
      minTime={setHours(setMinutes(new Date(), 0), 9)}
      maxTime={setHours(setMinutes(new Date(), 0), 17)}
      required
      
    />
    <br/>
    <DatePicker
    className={classes.dateinput}
      showTimeSelect
      selected = {this.state.returntime}
      onChange={ this.onChangereturn }
      name='pickuptime'
      excludeDates={this.state.excludeDates}
     
      value = {this.state.returntime}
      minDate={this.state.pickuptime} 
      timeFormat="HH:mm"
      timeIntervals={60}
      timeCaption="time"
      dateFormat="MMMM d, yyyy h:mm aa"
      minTime={setHours(setMinutes(new Date(), 0), 9)}
      maxTime={setHours(setMinutes(new Date(), 0), 17)}
      placeholderText="Choose return time"
      
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
    fetchRentalHistory: () => dispatch(fetchRentalHistory()),
   
  
})

const mapStateToProps = state => ({
  bookingStatus: state.customerReducer.bookingStatus,
  booking_dates: state.customerReducer.booking_dates,
  return_dates: state.customerReducer.return_dates,
  rentalhistory: state.adminReducer.rentalhistory

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Bookingdetails));