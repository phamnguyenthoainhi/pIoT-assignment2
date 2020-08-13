import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from "react-redux";
// import { Link } from "react-router-dom";


import style from './style';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {fetchCars} from '../../actions/carAction'
import Bookingdetails from './Bookingdetails'
class Carslist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            searchedCar: [],
            chosenCar: {},
            searchinput : ''
        }
    }

    componentDidUpdate(prevProps) {
        if(this.props.cars !== prevProps.cars) {
            this.setState({
                cars: this.props.cars,
                searchedCars : this.state.cars
               
                
            })
        }
    }

    componentDidMount() {
        this.props.fetchCars()
        
        
    }

    showDetails = (car) => {
        
        var bookdetails = document.getElementById("bookdetails");
        bookdetails.style.display = 'block'
        this.setState({
            chosenCar: car.car
        })
        
    }

    handleClose = () => {
        var bookdetails = document.getElementById("bookdetails");
        bookdetails.style.display = 'none'
    }

    handleChangeSearch = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name] : e.target.value
        }) 
        
        const searchedCars = this.state.cars.filter(car => car.title.includes(this.state.searchinput))
        if (searchedCars.length === 0) {
            this.setState({
                searchedCars: this.state.cars
            })
        } else {
            this.setState({
                searchedCars
            })
        }

        console.log(this.state.searchinput)
    }
    
    
    render() {
        console.log(this.state.chosenCar)
        const {classes} = this.props;
        return (
            <div>
                <TextField 
                variant='outlined'
                type="text"
                name="searchinput"
                placeholder="Search for a car "
                className={classes.textField} fullWidth 
                onChange={(e) => this.handleChangeSearch(e)}
                value={this.state.searchinput}
                />
                 <div id= "bookdetails" style={{"display": "none"}} >
                    
                <Bookingdetails car={this.state.chosenCar} handleClose={this.handleClose}/> </div>
                {this.state.searchedCars ? 
                (this.state.searchedCars.map((car) => 
                <div>
               
                <Card className={classes.root} key ={car.id}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {car.id}
                    </Typography>
                    
                    <Typography variant="body2" component="p">
                    Make
                    </Typography>
                    <Typography variant="body2" component="p">
                    Body Type
                    </Typography>
                    <Typography variant="body2" component="p">
                    Colour
                    </Typography>
                    <Typography variant="body2" component="p">
                    Seats
                    </Typography>
                    <Typography variant="body2" component="p">
                    Location
                    </Typography>
                    <Typography variant="body2" component="p">
                    Cost per hour
                    </Typography>
                </CardContent>
                
                <CardActions>
                    <Button size="small" 
                    onClick={() => this.showDetails({car})}  
                    id='bookcarbtn' className={classes.button}>Book this car</Button>
                </CardActions>
            </Card>
            </div>
                )):null}
                
                
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    fetchCars: () => dispatch(fetchCars()),
   
  
})

const mapStateToProps = state => ({
    cars: state.customerReducer.cars,

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Carslist));