import React, { Component } from 'react'
import style from './style';
import {connect} from "react-redux";
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
class Homepage extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Grid container className={classes.gridcontainer} spacing={2}>
                <Grid item xs={12}>
                    <img src='https://static.dribbble.com/users/29678/screenshots/5009992/electric_car_dribbble_mesa_de_trabajo_1_mesa_de_trabajo_1_4x.png?compress=1&resize=1200x900' 
                    alt='img' style={{width: "50%", display: "block", margin:"auto"}}/>
                </Grid>
                <Grid item xs={6}>
                <Button component={Link} fullWidth className={classes.buttonLogin}to="/login">LOGIN</Button><br/>
                    
                </Grid>
                <Grid item xs={6}>
                <Button component={Link}  fullWidth className={classes.buttonLogin} to="/signup">SIGN UP</Button><br/>
                    
                </Grid>
                </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Homepage));
