import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from "react-redux";
import style from './style.js';
import {fetchReport} from '../../actions/engineerAction';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
class Reportedcars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: [],
            
        }
    }
    componentDidUpdate(prevProps) {
        console.log(this.props.reports)
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
        const {classes} = this.props;
        return (
            <div>
                <Card className={classes.root}>
                    <CardHeader>
                        
                    </CardHeader>
                    <CardMedia>

                    </CardMedia>

                </Card>
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
