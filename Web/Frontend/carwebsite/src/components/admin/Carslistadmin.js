import React, { Component } from 'react'
import { withStyles } from '@material-ui/core';
import {connect} from "react-redux";
import style from './style.js'
import {fetchCars} from '../../actions/carAction'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
class Carslistadmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cars: [],
            searchedCar: [],
            
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
    openedit = () => {
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
        
        

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

    
        

        // When the user clicks anywhere outside of the modal, close it
       
    }

    closeedit = () => {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }
        
    render() {
        const {classes} = this.props;
        return (
            <div>

                <TextField 
                variant='outlined'
                type="text"
                name="searchinput"
                placeholder="Search for a car"
                className={classes.textField} fullWidth 
                onChange={(e) => this.handleChangeSearch(e)}
                value={this.state.searchinput}
                />
                <Button variant="contained" onClick={() => this.openedit()}>ADD A NEW CAR</Button>
                <div id="myModal" class="modal">
                    <div class="modal-content">
                    <span class="close" onClick={() => this.closeedit()}  >&times;</span>
                    <div class="form-group">
                        <label for="carmake">Make:</label>
                        <input type="text" class="form-control" id="carmake"/>
                    </div>
                    <div class="form-group">
                        <label for="bodytype">Body Type:</label>
                        <input type="text" class="form-control"  id="bodytype"/>
                    </div>
                    <div class="form-group">
                        <label for="colour">Colour:</label>
                        <input type="text" class="form-control"  id="colour"/>
                    </div>
                    <div class="form-group">
                        <label for="seats">Seats</label>
                        <input type="number" class="form-control"  id="seats"/>
                    </div>
                    <div class="form-group">
                        <label for="location">Location:</label>
                        <input type="text" class="form-control"  id="location"/>
                    </div>
                    <div class="form-group">
                        <label for="cost">Cost per hour:</label>
                        <input type="number" class="form-control"  id="cost"/>
                    </div>
                    <Button variant="contained">SAVE</Button>
                    </div>

                </div>
                        <table className="table">
                    <thead>
                    <tr>
                        <th style={{width: '10%', textAlign: 'center', color: "#51617D"}}>Make</th>
                        <th style={{width: '20%', textAlign: 'center', color: "#51617D"}}>Body Type</th>
                        <th style={{width: '10%', textAlign: 'center', color: "#51617D"}}>Colour</th>
                        <th style={{width: '10%', textAlign: 'center', color: "#51617D"}}>Seats</th>
                        <th style={{width: '20%', textAlign: 'center', color: "#51617D"}}>Location</th>
                        <th style={{width: '10%', textAlign: 'center', color: "#51617D"}}>Cost per hour</th>
                        <th style={{width: '10%', textAlign: 'center', color: "#51617D"}}></th>
                        <th style={{width: '10%', textAlign: 'center', color: "#51617D"}}></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td style={{textAlign: 'center'}}>John</td>
                        <td style={{textAlign: 'center'}}>Doe</td>
                        <td style={{textAlign: 'center'}}>john@example.com</td>
                        <td style={{textAlign: 'center'}}>john@example.com</td>
                        <td style={{textAlign: 'center'}}>john@example.com</td>
                        <td style={{textAlign: 'center'}}>john@example.com</td>
                        <td style={{textAlign: 'center'}}><Button variant="outlined" color="primary" className='edit-btn' onClick={() => this.openedit()}   >EDIT</Button></td>
                        <td style={{textAlign: 'center'}}><Button variant="outlined" color="secondary">DELETE</Button></td>
                    </tr>
                    
                    </tbody>
                </table>
                 
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Carslistadmin));
