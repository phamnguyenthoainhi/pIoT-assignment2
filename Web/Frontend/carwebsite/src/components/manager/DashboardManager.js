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
import {fetchMostBookings, fetchLeastBookings, fetchMostRevenues, fetchCarMakes} from '../../actions/managerAction';
import Grid from '@material-ui/core/Grid';
import Chart from "react-google-charts";
class DashboardManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mostbookings : [],
            leastbookings: [],
            revenues: [],
            carmakes: [],
            revenuelist: [],
            bookedlist: [],
            carmakelist: []
            
        }
    }
    componentDidMount() {
        this.props.fetchMostBookings()
        this.props.fetchLeastBookings()
        this.props.fetchMostRevenues()
        this.props.fetchCarMakes()
    }

    componentDidUpdate(prevProps) {
        
        if(this.props.mostbookings !== prevProps.mostbookings) {
            let list = [['Car', 'Booked Times']]
            this.props.mostbookings.forEach((booking) => 
                list.push([booking[0], parseInt(booking[1])])
            )
            this.setState({
                mostbookings: this.props.mostbookings,
                bookedlist: list
            })
        }  
        if(this.props.leastbookings !== prevProps.leastbookings) {
            this.setState({
                leastbookings: this.props.leastbookings
            })
        }  
        if(this.props.revenues !== prevProps.revenues) {
            
            let list = [['Car', 'Booked Times']]
            this.props.revenues.forEach((revenue) => 
                list.push([revenue[0], revenue[1]])
            )
            this.setState({
                revenues: this.props.revenues,
                revenuelist: list
            })
        } 
        if(this.props.carmakes !== prevProps.carmakes) {
            let list = [['Car', 'Booked Times']]
            this.props.carmakes.forEach((revenue) => 
                list.push([revenue[0], revenue[1]])
            )
            this.setState({
                carmakes: this.props.carmakes,
                carmakelist: list
            })
        }    
    }


  

    render() {
        const {classes} = this.props;

        return (
            <div style={{ margin:'0 auto'}}>
                    <Grid container className={classes.root} spacing={0}>
                        <Grid item lg={6}>
                        <div style={{ textAlign:'center'}}>
                        <h3 className={classes.charttitle}>Top 5 Most Booked Cars</h3>
                        {/* {console.log(this.state.bookedlist !== undefined ? (): null)} */}
                        {this.state.bookedlist.length !== 0 ? (
                            <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Car', 'Booked Times'],
                                [this.state.bookedlist[1][0].toString(), this.state.bookedlist[1][1]],
                                [this.state.bookedlist[2][0].toString(), this.state.bookedlist[2][1]],
                                [this.state.bookedlist[3][0].toString(), this.state.bookedlist[3][1]],
                                [this.state.bookedlist[4][0].toString(), this.state.bookedlist[4][1]]
                                
                            ]}
        
                            
                           
                           
                            rootProps={{ 'data-testid': '1' }}
                            style={{ margin:'0 auto'}}
                            />
                        ): null}
                    
                    </div>
                        </Grid>
                        <Grid item lg={6}>
                        <div style={{ textAlign:'center'}}>
                        <h3 className={classes.charttitle}>Top 5 Most Profitable Cars</h3>
                        {this.state.revenues.length !== 0 ? (
                            
                            <Chart
                    width={'500px'}
                    height={'300px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Car', 'Revenues'],
                        [this.state.revenuelist[1][0].toString(), parseInt(this.state.revenuelist[1][1])],
                        [this.state.revenuelist[2][0].toString(), parseInt(this.state.revenuelist[2][1])],
                        [this.state.revenuelist[3][0].toString(), parseInt(this.state.revenuelist[3][1])],
                        [this.state.revenuelist[4][0].toString(), parseInt(this.state.revenuelist[4][1])],
                        // [this.state.revenuelist[5][0].toString(), parseInt(this.state.revenuelist[5][1])]
                        
                    ]}
                    rootProps={{ 'data-testid': '1' }}
                    style={{ margin:'0 auto'}}
                    />
                        ):null}
                    
                    </div>
                        </Grid>
                    </Grid>
                    
                    
                    <div style={{ textAlign:'center'}}>
                    <h3 className={classes.charttitle}>Makes of car</h3>
                    
                    {console.log(this.state.carmakelist)}
                    {this.state.carmakelist.length !== 0 ? (
                        <Chart
                        width={'800px'}
                        height={'500px'}
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        
//                         data={[
//                             ["Car Make", "Number of Car Makes"],
// ["make 1", 2],
// ["make 2", 1],
// ["make 3", 1],
// ["make 4", 1],
// ["make 5", 1],
// ["make 6", 1]
//                         ]}
                        data={[this.state.carmakelist]}
                        options={{
                            title: '',
                            chartArea: { width: '50%' },
                            hAxis: {
                            title: '',
                            minValue: 0,
                            },
                            vAxis: {
                            title: 'City',
                            },
                        }}
                        // For tests
                        rootProps={{ 'data-testid': '1' }}
                        />
                    ): null}
                        {/* <Chart
                        width={'800px'}
                        height={'500px'}
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        
//                         data={[
//                             ["Car Make", "Number of Car Makes"],
// ["make 1", 2],
// ["make 2", 1],
// ["make 3", 1],
// ["make 4", 1],
// ["make 5", 1],
// ["make 6", 1]
//                         ]}
                        data={[this.loopdata()]}
                        options={{
                            title: '',
                            chartArea: { width: '50%' },
                            hAxis: {
                            title: '',
                            minValue: 0,
                            },
                            vAxis: {
                            title: 'City',
                            },
                        }}
                        // For tests
                        rootProps={{ 'data-testid': '1' }}
                        /> */}
                    </div>
                

                
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    fetchMostRevenues: () => dispatch(fetchMostRevenues()),
    fetchLeastBookings: () => dispatch(fetchLeastBookings()),
    fetchMostBookings: () => dispatch(fetchMostBookings()),
    // fetchCarMakes
    fetchCarMakes: () => dispatch(fetchCarMakes()),
    
   
  
})

const mapStateToProps = state => ({
    
    mostbookings: state.managerReducer.mostbookings,
    leastbookings: state.managerReducer.leastbookings,
    revenues: state.managerReducer.revenues,
    carmakes: state.managerReducer.carmakes

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(DashboardManager));
