import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from "react-redux";
import style from './style';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import {fetchMostBookings, fetchLeastBookings, fetchMostRevenues} from '../../actions/managerAction';
import Grid from '@material-ui/core/Grid';
import Chart from "react-google-charts";
class DashboardManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mostbookings : [],
            leastbookings: [],
            revenues: []
            
        }
    }
    componentDidMount() {
        console.log("Hello")
        this.props.fetchMostBookings()
        this.props.fetchLeastBookings()
        this.props.fetchMostRevenues()
    }

    componentDidUpdate(prevProps) {
        
        if(this.props.mostbookings !== prevProps.mostbookings) {
            this.setState({
                mostbookings: this.props.mostbookings
            })
        }  
        if(this.props.leastbookings !== prevProps.leastbookings) {
            this.setState({
                leastbookings: this.props.leastbookings
            })
        }  
        if(this.props.revenues !== prevProps.revenues) {
            this.setState({
                revenues: this.props.revenues
            })
        }    
    }
  

    render() {
        const {classes} = this.props;
        console.log(this.state)
        
        return (
            <div>
                    {/* <div style={{ display: 'flex', maxWidth: 900 }}> */}
                <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Car', 'Booked Times'],
                        ['Car 1', 3],
                        ['Car 2', 2],
                        ['Car 3', 2],
                        ['Car 4', 1]
                        
                    ]}
                    options={{
                        title: 'Most Booked Car',
                    }}
                    rootProps={{ 'data-testid': '1' }}
                    />
    {/* </div> */}
                
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    fetchMostRevenues: () => dispatch(fetchMostRevenues()),
    fetchLeastBookings: () => dispatch(fetchLeastBookings()),
    fetchMostBookings: () => dispatch(fetchMostBookings()),
    
   
  
})

const mapStateToProps = state => ({
    
    mostbookings: state.managerReducer.mostbookings,
    leastbookings: state.managerReducer.leastbookings,
    revenues: state.managerReducer.revenues,

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(DashboardManager));
