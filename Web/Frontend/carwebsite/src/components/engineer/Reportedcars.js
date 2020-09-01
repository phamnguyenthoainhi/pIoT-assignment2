import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from "react-redux";
import style from './style.js';
import {fetchReport} from '../../actions/engineerAction';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import { Map, GoogleApiWrapper,  Marker  } from 'google-maps-react';
import MapLoader from '../map/Map';
import Grid from '@material-ui/core/Grid';
class Reportedcars extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reports: [],
            stores: [{lat: 47.49855629475769, lng: -122.14184416996333},
                {latitude: 47.359423, longitude: -122.021071},
                {latitude: 47.2052192687988, longitude: -121.988426208496},
                {latitude: 47.6307081, longitude: -122.1434325},
                {latitude: 47.3084488, longitude: -122.2140121},
                {latitude: 47.5524695, longitude: -122.0425407}]
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
    displayMarkers = () => {
        return this.state.stores.map((store, index) => {
          return <Marker key={index} id={index} position={{
           lat: store.latitude,
           lng: store.longitude
         }}
         onClick={() => console.log("You clicked me!")} />
        })
      }

    componentDidMount() {
        this.props.fetchReport()
        
        
    }
    render() {
        console.log(this.state.reports)
        const {classes} = this.props;
        return (
            <div>
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={6}>
                    <Card className={classes.root}>
                    <CardHeader>
                        Card Header
                    </CardHeader>
                    
                    <CardMedia>
                    <MapLoader />
                    </CardMedia>

                </Card>
                    </Grid>
                    <Grid item xs={6}>
                    <Card className={classes.root}>
                    <CardHeader>
                        Card Header
                    </CardHeader>
                    
                    <CardMedia>
                    <MapLoader />
                    </CardMedia>

                </Card>
                    </Grid>
                    
                </Grid>
               
                {/* <Map
          google={this.props.google}
          zoom={8}
          style={{width: '100%',
          height: '100%',}}
          initialCenter={{ lat: 47.444, lng: -122.176}}
        >
          {this.displayMarkers()}
        </Map> */}

                
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
GoogleApiWrapper({
    apiKey: 'AIzaSyCc23hisVCuVZTq3GNvfJGSWXlMr19feC8'
  })(Reportedcars);