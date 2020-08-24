import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from "react-redux";
// import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';

import style from './style';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import {fetchCars, bookCar} from '../../actions/carAction'
import Bookingdetails from './Bookingdetails';
import Navigationbar from './Navigationbar';
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
                searchedCars : this.props.cars
               
                
            })
        }
    }

    componentDidMount() {
        this.props.fetchCars()
        // if (this.state.searchedCars.length === 0) {
        //         this.setState({
        //             searchedCars: this.state.cars
        // })
        
    // }
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
        if (this.state.cars !== undefined) {
            const searchedCars = this.state.cars.filter(car => car.make.includes(this.state.searchinput) || car.body_type.includes(this.state.searchinput) || car.color.includes(this.state.searchinput) || car.location.includes(this.state.searchinput) )
            if (searchedCars.length === 0) {
                this.setState({
                    searchedCars: this.state.cars
                })
            } else {
                this.setState({
                    searchedCars
                })
            }
        }
        

        
        // console.log(this.state.searchinput)
    }
    
    
    render() {
        console.log(this.state.searchedCars)
        const {classes} = this.props;
        return (
            <div>
                <Navigationbar />
                <div className={classes.content}>

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
                        (<Grid container spacing={3} className={classes.carscontainer}>
                            {this.state.searchedCars.map((car) => 
                        
                            
                            <Grid item lg={4} md={4} sm={6} xs={12}>
                            
                            <Card className={classes.carcard} key ={car.id}>
                            <CardContent>
                                <Typography className={classes.carcardtitle} color="textSecondary" gutterBottom>
                                {car.car_id}
                                </Typography>
                                
                                <Typography variant="body2" component="p">
                                Car Make: {car.make}
                                </Typography>
                                <Typography variant="body2" component="p">
                                Body Type: {car.body_type}
                                </Typography>
                                <Typography variant="body2" component="p">
                                Color: {car.color}
                                </Typography>
                                <Typography variant="body2" component="p">
                                Seats: {car.seats}
                                </Typography>
                                <Typography variant="body2" component="p">
                                Location: {car.location}
                                </Typography>
                                <Typography variant="body2" component="p">
                                Cost per hour: {car.cost}
                                </Typography>
                            </CardContent>
                            
                            <CardActions>
                                <Button size="small" 
                                onClick={() => this.showDetails({car})}  
                                id='bookcarbtn' className={classes.bookcarbutton}>Book this car</Button>
                            </CardActions>
                        </Card>
                        </Grid>
                        
                    
    )}</Grid>):
                (<Grid container spacing={3}>
                    {this.state.cars.map((car) => 
                        
                            
                            <Grid item lg={4} md={3} sm={6} xs={12}>
                                <Card className={classes.root} key ={car.id}>
                                <CardContent>
                                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    {car.car_id}
                                    </Typography>
                                    
                                    <Typography variant="body2" component="p">
                                    Car Make: {car.make}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                    Body Type: {car.body_type}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                    Color: {car.color}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                    Seats: {car.seats}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                    Location: {car.location}
                                    </Typography>
                                    <Typography variant="body2" component="p">
                                    Cost per hour: {car.cost}
                                    </Typography>
                                </CardContent>
                                
                                <CardActions>
                                    <Button size="small" 
                                    onClick={() => this.showDetails({car})}  
                                    id='bookcarbtn' className={classes.button}>Book this car</Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        
                    
                )}
                </Grid>)
                }
                
                </div>  
            </div>
        )
    }
}
const mapDispatchToProps = dispatch => ({
    fetchCars: () => dispatch(fetchCars()),
    bookCar: (booking) => dispatch(bookCar(booking))
   
  
})

const mapStateToProps = state => ({
    cars: state.customerReducer.cars,

});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Carslist));