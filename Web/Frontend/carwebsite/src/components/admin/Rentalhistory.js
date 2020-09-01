import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from "react-redux";
import style from './style.js';
import {fetchRentalHistory} from '../../actions/adminAction';
import Navigationbaradmin from './Navigationbar';
class Rentalhistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rentalhistory: [],
            
        }
    }
    componentDidUpdate(prevProps) {
        if(this.props.rentalhistory !== prevProps.rentalhistory) {
            this.setState({
                rentalhistory: this.props.rentalhistory,
                
               
                
            })
        }
    }

    componentDidMount() {
        this.props.fetchRentalHistory()
        
        
    }

    render() {
        console.log(this.state.rentalhistory)
        const {classes} = this.props;
        return (
            <div>
                <Navigationbaradmin />
                <div className={classes.historycontainer}>
                 <table className="table">
                    <thead>
                    <tr>
                        <th style={{width: '25%', textAlign: 'center', color: "#66827A"}}>Username</th>
                        <th style={{width: '25%', textAlign: 'center', color: "#66827A"}}>Car Name</th>
                        
                        <th style={{width: '25%', textAlign: 'center', color: "#66827A"}}>Pickup Date</th>
                        <th style={{width: '25%', textAlign: 'center', color: "#66827A"}}>Drop-off Date</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.rentalhistory ? (
                            this.state.rentalhistory.map((history) => 
                            <tr key = {history.id}>
                        <td style={{textAlign: 'center'}}>{history.user.username}</td>
                        <td style={{textAlign: 'center'}}>{history.car.make}</td>
                        
                        <td style={{textAlign: 'center'}}>{history.booking_date}</td>
                        <td style={{textAlign: 'center'}}>{history.return_date}</td>
                    </tr>
                            )
                        ): null}
                    
                    
                    </tbody>
                </table>
                </div>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    fetchRentalHistory: () => dispatch(fetchRentalHistory()),
   
})

const mapStateToProps = state => ({
  rentalhistory: state.adminReducer.rentalhistory,

});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Rentalhistory));