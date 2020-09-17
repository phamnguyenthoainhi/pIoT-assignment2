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
    dateConvert = (date) => {
        const mydate = new Date(date)
        const string = mydate.getDate() + "-" + mydate.getMonth() + "-" + mydate.getFullYear() 
        // + " " + mydate.getHours()+ ":" + mydate.getMinutes()
        
        return string
    }

    render() {
        console.log(this.state.rentalhistory)
        const {classes} = this.props;
        return (
            <div>
                <Navigationbaradmin {...this.props}/>
                <div className={classes.historycontainer}>
                 <table className="table">
                    <thead>
                    <tr>
                        <th style={{width: '25%', textAlign: 'left', color: "#66827A"}}>Customer</th>
                        <th style={{width: '40%', textAlign: 'left', color: "#66827A"}}>Car</th>
                        
                        <th style={{width: '15%', textAlign: 'left', color: "#66827A"}}>Pickup Date</th>
                        <th style={{width: '15%', textAlign: 'left', color: "#66827A"}}>Drop-off Date</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.state.rentalhistory ? (
                            this.state.rentalhistory.map((history) => 
                            <tr key = {history.history_id}>
                        <td style={{textAlign: 'left'}}>
                            {history.user.username}<br/>
                            {history.user.email}
                            </td>
                        <td style={{textAlign: 'left'}}>
                            <b style={{ color: "#93ABA5"}}>Car Make:</b> {history.car.make}<br/>
                            <b style={{ color: "#93ABA5"}}>Body Type:</b> {history.car.body_type}<br/>
                            <b style={{ color: "#93ABA5"}}>Color:</b> {history.car.color}<br/>
                            <b style={{ color: "#93ABA5"}}>Seats: </b>{history.car.seats}<br/>
                            <b style={{ color: "#93ABA5"}}>Location:</b> {history.car.location}<br/>
                            <b style={{ color: "#93ABA5"}}>Cost/hour: </b>{history.car.cost}<br/>
                        </td>
                        
                        <td style={{textAlign: 'left'}}>{this.dateConvert(history.booking_date)}</td>
                        <td style={{textAlign: 'left'}}>{this.dateConvert(history.return_date)}</td>
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