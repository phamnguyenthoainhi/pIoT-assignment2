import React, { Component } from 'react'
import {connect} from 'react-redux';
import { withStyles } from '@material-ui/core';
import style from './style';
class sample extends Component {
    render() {
        // const {classes} = this.props;
        return (
            <div>
                
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(sample));
