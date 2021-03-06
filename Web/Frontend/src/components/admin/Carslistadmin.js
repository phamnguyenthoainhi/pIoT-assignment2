import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from "react-redux";
import style from './style.js'
import {fetchCars, createCar} from '../../actions/carAction'
import {editCar, deleteCar, createReport } from '../../actions/adminAction'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { GoogleApiWrapper  } from 'google-maps-react';
import Navigationbaradmin from './Navigationbar';
import IconButton from '@material-ui/core/IconButton';
import ReportRoundedIcon from '@material-ui/icons/ReportRounded';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ErrorIcon from '@material-ui/icons/Error';
class Carslistadmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            searchedCar: [],
                car_id: '', 
                make: "", 
                body_type: "",
                color:"", 
                seats: 0, 
                location: "",
                cost: 0
            ,
            searchinput : '',
            reportcarid: '',
            car: '',
            long: '',
            lat: ''
        }
        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    }

    onChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
        this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
    }

    componentDidUpdate(prevProps) {
        if(this.props.cars !== prevProps.cars) {
            this.setState({
                cars: this.props.cars,
                searchedCars : this.props.cars    
            })
        }
    }

    handlePlaceChanged(){
        const place = this.autocomplete.getPlace();
        this.setState({
            long: place.geometry.location.lng(),
            lat: place.geometry.location.lat(),
            location : place.formatted_address
        })
        
    }
    
    componentDidMount() {
        this.props.fetchCars()
        this.autocomplete = new window.google.maps.places.Autocomplete(this.autocompleteInput.current,
            {"types": ["geocode"]});
    
        this.autocomplete.addListener('place_changed', this.handlePlaceChanged);    
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
    }

    openedit = (car) => {
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
        if (car !== undefined ) {
            console.log("edit")
            this.setState ({
                car_id: car.car.car_id, 
                    make: car.car.make, 
                    body_type: car.car.body_type,
                    color: car.car.color, 
                    seats: car.car.seats, 
                    location: car.car.location,
                    cost: car.car.cost,
                    long: car.car.longitude,
                    lat: car.car.latitude
            })
        }
    }

    openreport = (car) => {
        var modal = document.getElementById("myModal1");
        modal.style.display = "block";
        this.setState({
            reportcontent: ""
        })
        this.setState({
            reportcarid: car.car.car_id,
            car: car.car
        })  
    }

    closeedit = () => {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }

    closeopen = () => {
        var modal = document.getElementById("myModal1");
        modal.style.display = "none";
    }

    delete = (car) => {
        this.props.deleteCar(car.car)
    }

    onSubmitreport = (e) => {
        e.preventDefault();
        const date = new Date()
        const report = {
            car_id : this.state.reportcarid,
            user_id : parseInt(sessionStorage.getItem("id")),
            content : this.state.reportcontent,
            report_date : date.toString(),
            car: this.state.car
        }
        this.props.createReport(report)
        this.closeopen()
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.state.car_id !== '') {
            const car = {
                car_id: this.state.car_id, 
                make: this.state.make, 
                body_type: this.state.body_type,
                color: this.state.color, 
                seats: this.state.seats, 
                location: this.state.location,
                cost: this.state.cost,
                latitude: parseFloat(this.state.lat),
                longitude: parseFloat(this.state.long)
            }
            this.props.editCar(car)
        } else {
            const car = {
                make: this.state.make, 
                body_type: this.state.body_type,
                color: this.state.color, 
                seats: parseInt(this.state.seats), 
                location: this.state.location,
                cost: this.state.cost,
                locked: 1,
                latitude: this.state.lat,
                longitude: this.state.long
            }
        this.props.createCar(car)
        }
        this.closeedit()
    }
        
    render() {
        const {classes} = this.props;
        return (
            <div>
                <Navigationbaradmin {...this.props} />
                <div className={classes.carlistcontainer}>
                <TextField 
                variant='outlined'
                type="text"
                name="searchinput"
                placeholder="Search for a car"
                className={classes.textField} fullWidth 
                onChange={(e) => this.handleChangeSearch(e)}
                value={this.state.searchinput}
                />

                <Button
                className={classes.addcarbtn}
                startIcon={<AddIcon />}
                onClick={() => this.openedit()}
                >Add a new car</Button>

                <form id="myModal" className="modal" onSubmit={(e) => this.onSubmit(e)}>
                    <div className="modal-content">
                    <span className="close" onClick={() => this.closeedit()}  >&times;</span>
                    <div className="form-group">
                        <label htmlFor="carmake">ID:</label>
                        <input type="text" className="form-control" id="car_id" name='car_id' value={this.state.car_id} disabled/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="carmake">Make:</label>
                        <input type="text" className="form-control" id="carmake" name='make' value={this.state.make}  onChange= {(e) => this.onChange(e)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="bodytype">Body Type:</label>
                        <input type="text" className="form-control"  id="bodytype" name='body_type' value={this.state.body_type}  onChange= {(e) => this.onChange(e)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="colour">Colour:</label>
                        <input type="text" className="form-control"  id="color" name='color' value={this.state.color} onChange= {(e) => this.onChange(e)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="seats">Seats</label>
                        <input type="number" className="form-control"  id="seats" name='seats' value={this.state.seats} onChange= {(e) => this.onChange(e)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">Location:</label>
                        <input ref={this.autocompleteInput}  id="autocomplete" placeholder="Enter your address"  required name='location' value={this.state.location} onChange = {(e) => this.handleChangeSearch(e)}
                        type="text"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="cost">Cost per hour:</label>
                        <input type="number" className="form-control"  id="cost" name='cost' value={this.state.cost} onChange= {(e) => this.onChange(e)} required/>
                    </div>
                    <Button variant="contained" type='submit'  >SAVE</Button>
                    </div>

                </form>
                <form id="myModal1" className="modal" onSubmit={(e) => this.onSubmitreport(e)}>
                    <div className="modal-content">
                    <span className="close" onClick={() => this.closeopen()}  >&times;</span>
                    <div className="form-group">
                        <label htmlFor="carmake">Desciption of problem:</label>
                        <textarea type="text" className="form-control" id="carmake" name='reportcontent' value = {this.state.reportcontent} onChange= {(e) => this.onChange(e)}/>
                    </div>
                    
                    <Button variant="contained" type='submit' >Report</Button>
                    </div>

                </form>
                        <table className="table">
                    <thead>
                    <tr>
                        <th style={{width: '11%', textAlign: 'left', color: "#66827A"}}>Make</th>
                        <th style={{width: '15%', textAlign: 'left', color: "#66827A"}}>Body Type</th>
                        <th style={{width: '10%', textAlign: 'left', color: "#66827A"}}>Colour</th>
                        <th style={{width: '10%', textAlign: 'left', color: "#66827A"}}>Seats</th>
                        <th style={{width: '20%', textAlign: 'left', color: "#66827A"}}>Location</th>
                        <th style={{width: '10%', textAlign: 'center', color: "#66827A"}}>Cost/hour</th>
                        
                        <th style={{width: '8%', textAlign: 'center', color: "#66827A"}}></th>
                        <th style={{width: '8%', textAlign: 'center', color: "#66827A"}}></th>
                        <th style={{width: '8%', textAlign: 'center', color: "#66827A"}}></th>
                    </tr>
                    </thead>
                    
                    {this.state.searchedCars ? 
                       ( <tbody>
                    {this.state.searchedCars.map((car) => 
                    <tr key={car.car_id}>
                        <td style={{textAlign: 'left'}}>{car.make}</td>
                        <td style={{textAlign: 'left'}}>{car.body_type}</td>
                        <td style={{textAlign: 'left'}}>{car.color}</td>
                        <td style={{textAlign: 'left'}}>{car.seats}</td>
                        <td style={{textAlign: 'left'}}>{car.location}</td>
                        <td style={{textAlign: 'center'}}>${car.cost}</td>
                        <td style={{textAlign: 'right'}}>
                           
                        <Button
                            variant="contained"
                            
                            className={classes.button}
                            startIcon={<ErrorIcon />}
                            className={classes.adminreportbutton}
                            color="default" onClick={() => this.openreport({car})}
                            >
                                Report
                            </Button>
                           
                        </td>
                        <td style={{textAlign: 'right'}}>
                            <Button
                            variant="contained"
                            
                            className={classes.button}
                            startIcon={<EditIcon />}
                            className={classes.admineditbutton}
                            onClick={() => this.delete({car})}
                            onClick={() => this.openedit({car})}
                            >
                                Edit
                            </Button>
                        </td>
                        <td style={{textAlign: 'right'}}>
                            {/* <div> */}
                            <Button
                            variant="contained"
                            
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                            className={classes.admindeletebutton}
                            onClick={() => this.delete({car})}
                            >
                                Delete
                            </Button>
                        </td>
                       
                    </tr>
                    )}
                    </tbody>):
                    (<tbody>
                        {this.state.cars.map((car) => 
                        <tr key={car.car_id}>
                            <td style={{textAlign: 'center'}}>{car.make}</td>
                            <td style={{textAlign: 'center'}}>{car.body_type}</td>
                            <td style={{textAlign: 'center'}}>{car.color}</td>
                            <td style={{textAlign: 'center'}}>{car.seats}</td>
                            <td style={{textAlign: 'center'}}>{car.location}</td>
                            <td style={{textAlign: 'center'}}>{car.cost}</td>
                            <td style={{textAlign: 'center'}}>
                                <Button variant="outlined" color="default" onClick={() => this.openreport()} >Report</Button>
                                <Button variant="outlined" color="primary" className='edit-btn' onClick={() => this.openedit({car})}>EDIT</Button>
                                <Button variant="outlined" color="secondary" onClick={() => this.delete({car})}>DELETE</Button>
                            </td>
                        </tr>
                        )}
                        </tbody>)}
                </table>
                 
            </div>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCars: () => dispatch(fetchCars()),
    createCar: (car) => dispatch(createCar(car)),
    editCar: (car) => dispatch(editCar(car)),
    deleteCar: (id) => dispatch(deleteCar(id)),
    createReport: (report) => dispatch(createReport(report))
})

const mapStateToProps = state => ({
  cars: state.customerReducer.cars,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Carslistadmin));

GoogleApiWrapper({
    apiKey: 'AIzaSyCc23hisVCuVZTq3GNvfJGSWXlMr19feC8'
  })(Carslistadmin);