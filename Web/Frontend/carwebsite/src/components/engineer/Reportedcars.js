import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from "react-redux";
import style from './style.js';
import {fetchReport} from '../../actions/engineerAction'
class Reportedcars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: [],
            
        }
    }
    componentDidUpdate(prevProps) {
        if(this.props.reports !== prevProps.reports) {
            this.setState({
                reports: this.props.reports,
                searchedreports : this.state.reports
               
                
            })
        }
    }

    componentDidMount() {
        this.props.fetchReport()
        
        
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    fetchReport: () => dispatch(fetchReport()),
})

const mapStateToProps = state => ({
  cars: state.customerReducer.cars,

});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Reportedcars));
