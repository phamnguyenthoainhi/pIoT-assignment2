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
import Typography from '@material-ui/core/Typography';
class Carslist extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
                <TextField 
                variant='outlined'
                type="text"
                // name="loginUsername"
                placeholder="Search for a car"
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
               <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Name of the car
                    </Typography>
                    
                    <Typography variant="body2" component="p">
                    Make
                    </Typography>
                    <Typography variant="body2" component="p">
                    Body Type
                    </Typography>
                    <Typography variant="body2" component="p">
                    Colour
                    </Typography>
                    <Typography variant="body2" component="p">
                    Seats
                    </Typography>
                    <Typography variant="body2" component="p">
                    Location
                    </Typography>
                    <Typography variant="body2" component="p">
                    Cost per hour
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" className={classes.button}>Book this car</Button>
                </CardActions>
            </Card> 
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Carslist));