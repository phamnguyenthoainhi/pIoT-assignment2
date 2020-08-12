import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import style from './style';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';
class Bookingdetails extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div>

                <form className={classes.root} noValidate autoComplete="off">
                <h2>Booking Details</h2>
                {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
        //   value={selectedDate}
        //   onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        </MuiPickersUtilsProvider> */}
        <input type="date" id="birthday" name="birthday"/>
                <TextField 
                variant='outlined'
                type="text"
                // name="loginUsername"
                // placeholder="Email"
                className={classes.textField} fullWidth color="grey"
                // helperText = {this.state.loginFormError.emailError}
                // error = {!!this.state.loginFormError.emailError}
                // id="loginEmail"
                // InputLabelProps={{className: classes.input}}
                // InputProps={{
                //     className: classes.input,
                //     startAdornment: (
                //         <InputAdornment position="start">
                //             <AccountCircleIcon style={{color: '#3C5155'}}/>
                //         </InputAdornment>
                //     ),
                // }}
                // onChange={this.handleChange}
                // value={this.state.loginEmail}
                />
                <br/>
                <TextField 
                variant='outlined'
                type="text"
                fullWidth
                // name="loginPassword"
                // placeholder="Password"
                className={classes.textField}
                // helperText = {this.state.loginFormError.emailError}
                // error = {!!this.state.loginFormError.emailError}
                // id="loginPassword"
                />
                
                <Button variant="contained" color="primary">Save</Button>
                </form>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    // sendMessage: (message, history) => dispatch(sendMessage(message, history)),
   
  
})

const mapStateToProps = state => ({
    // sendMessageLoading: state.usersReducer.sendMessageLoading,

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Bookingdetails));