import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from "react-redux";
import style from './style';

import Button from '@material-ui/core/Button';
// import manager from '../../../public/manager.gif'
import {fetchMostBookings, fetchLeastBookings, fetchMostRevenues, fetchCarMakes, fetchMonthlyRevenues} from '../../actions/managerAction';
import Grid from '@material-ui/core/Grid';
import Chart from "react-google-charts";
import { Link } from "react-router-dom";
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
            carmakelist: [],
            monthlyrevenues: []
            
        }
    }
    componentDidMount() {
        if (sessionStorage.getItem("id") === null) {
            
            this.props.history.push("/")
        }
        this.props.fetchMostBookings()
        this.props.fetchLeastBookings()
        this.props.fetchMostRevenues()
        this.props.fetchCarMakes()
        this.props.fetchMonthlyRevenues()
        
        
        
    }
    logout = () => {
        sessionStorage.removeItem("id")
        sessionStorage.removeItem("role")
        
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
        if(this.props.monthlyrevenues !== prevProps.monthlyrevenues) {
            let list = [['x', 'Revenues']]
            this.props.monthlyrevenues.forEach((revenue) => 
                list.push([revenue[0], parseInt(revenue[1])])
            )
            this.setState({
                monthlyrevenues: list
                
            })
        }      
    }


  

    render() {
        const {classes} = this.props;

        return (
            <div>
<div className='navigationbar'>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                {/* <a className="nav-link" href="/customer/cars"></a> */}
                                </li>
                                <li className="nav-item active">
                                    {/* <a className="nav-link" href="/customer/dashboard">Dashboard</a> */}
                                    
                                </li>
                                
                                </ul>
                                <form className="form-inline my-2 my-lg-0">
                                    {sessionStorage.getItem("id") !== null ? (<Button className={classes.buttonLogout} onClick={()=> this.logout()} component={Link} to='/'>Logout</Button>):(<Button className={classes.buttonLogout} onClick={()=> this.logout()} component={Link} to='/'>Login</Button>)}
                                {/* <Button className={classes.buttonLogout} onClick={()=> this.logout()} component={Link} to='/'>Logout</Button><br/> */}
                                </form>
                            </div>
                    </nav>
                </div>
                <div className={classes.top}>
                    
                    <div>
                  
     <img src="https://static.dribbble.com/users/1163232/screenshots/14002832/media/cefce9d9c71a4d4eddf04f3d0fd4453d.jpg"
     className="d-inline-block align-top" style={{width: "50%"}}
      alt="mdb logo"/>
                    </div>
                    <h3 className={classes.toptitle}>
                        Welcome, Manager!
                    </h3>
                    
                </div>
                <div style={{ textAlign:'center'}} className={classes.cardchart}>
                            
                            {console.log(this.state.monthlyrevenues)}
                            {this.state.monthlyrevenues.length !== 0 ? (
                            <Chart
                                width={'800px'}
                                height={'500px'}
                                chartType="LineChart"
                                loader={<div>Loading Chart</div>}
                                data={this.state.monthlyrevenues}
                                options={{
                                    hAxis: {
                                    title: 'Months',
                                    },
                                    vAxis: {
                                    title: 'Revenues',
                                    },
                                    colors: ['#40a8c4'],
                                }}
                                rootProps={{ 'data-testid': '1' }}
                                style={{ margin:'0 auto'}}
                                />
                                 ):null}
                                 <h3 className={classes.charttitle}>Revenue in this year</h3>
                    </div>
                    
            <div style={{ margin:'0 auto'}}>
                    <Grid container className={classes.root} spacing={4}>
                        <Grid item lg={6} >
                        <div style={{ textAlign:'center'}} className={classes.cardpie1} >
                        
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
                        
        
                            options={{
                                
                                colors: ['#ff7e67', '#68b0ab', "#fbd46d",'#006a71'],
                                
                            }}
                           
                           
                            rootProps={{ 'data-testid': '1' }}
                            style={{ margin:'0 auto'}}
                            />
                        ): null}
                    <h3 className={classes.charttitle}>Top 5 Most Booked Cars</h3>
                    </div>
                        </Grid>
                        <Grid item lg={6} >
                        <div style={{ textAlign:'center'}} className={classes.cardpie2}>
                        
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
                    options={{
                                
                        colors: ['#222831', '#c1a57b', "#30475e",'#9e9e9e'],
                        
                    }}
                    />
                        ):null}
                    <h3 className={classes.charttitle}>Top 5 Most Profitable Cars</h3>
                    </div>
                        </Grid>
                    </Grid>
                    
                    
                    <div style={{ textAlign:'center'}} className={classes.chart}>
                    
                    
                    {this.state.carmakelist.length !== 0 ? (
                        <Chart
                        width={'800px'}
                        height={'500px'}
                        chartType="BarChart"
                        loader={<div>Loading Chart</div>}
                        data={this.state.carmakelist}
                       
                        options={{
                            title: '',
                            chartArea: { width: '50%' },
                            hAxis: {
                            title: '',
                            minValue: 0,
                            },
                            vAxis: {
                            title: 'Car Make',
                            },
                            colors: ['#93ABA5'],
                        }}
                        
                        style={{ margin:'0 auto'}}
                        />
                    ): null}
                    <h3 className={classes.charttitle}>Makes of car</h3>
                    </div>
                    
                        
                   
                    
                

                
            </div>
            {/* <div class="footer">
  <p>Programming Internet of Things - Group 2</p>
</div> */}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    fetchMostRevenues: () => dispatch(fetchMostRevenues()),
    fetchLeastBookings: () => dispatch(fetchLeastBookings()),
    fetchMostBookings: () => dispatch(fetchMostBookings()),
    fetchCarMakes: () => dispatch(fetchCarMakes()),
    fetchMonthlyRevenues: () => dispatch(fetchMonthlyRevenues()),
})

const mapStateToProps = state => ({
    
    mostbookings: state.managerReducer.mostbookings,
    leastbookings: state.managerReducer.leastbookings,
    revenues: state.managerReducer.revenues,
    carmakes: state.managerReducer.carmakes,
    monthlyrevenues: state.managerReducer.monthlyrevenues

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(DashboardManager));
