
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from "react-redux";
import { Link } from "react-router-dom";
import style from './style';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
class Signup extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.container}>
                
                <form className={classes.root} noValidate autoComplete="off">
                <h2>Sign Up</h2>
                <TextField 
                variant='outlined'
                type="text"
                name="signupUsername"
                placeholder="Username"
                className={classes.textField} fullWidth 
                // helperText = {this.state.loginFormError.emailError}
                // error = {!!this.state.loginFormError.emailError}
                id="loginEmail"
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
                name="loginPassword"
                placeholder="Password"
                className={classes.textField}
                // helperText = {this.state.loginFormError.emailError}
                // error = {!!this.state.loginFormError.emailError}
                id="signupPassword"
                />
                <Button component={Link} to="/login">Login Here</Button><br/>
                <Button variant="contained" color="primary">Sign Up</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Signup));
