import React, { Component } from 'react'
import style from './style';
import {connect} from "react-redux";
import { withStyles } from '@material-ui/core';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
class Homepage extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Button component={Link} fullWidth className={classes.buttonLogin}to="/signup">LOGIN</Button><br/>
                <Button component={Link}  fullWidth className={classes.buttonLogin} to="/login">SIGN UP</Button><br/>
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
