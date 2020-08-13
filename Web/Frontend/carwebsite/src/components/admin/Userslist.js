import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from "react-redux";
import style from './style.js';

class Userslist extends Component {
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    // bookCar: (booking) => dispatch(bookCar(booking)),
   
  
})

const mapStateToProps = state => ({
//   bookingStatus: state.customerReducer.bookingStatus,

});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Userslist));
