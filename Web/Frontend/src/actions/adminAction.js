import { 
    FETCH_RENTAL_CARS, 
    FETCH_USERS,  
} from './types';
import {backend} from './backend'
import {fetchCars} from './carAction';

// Function to fetch all rentail history
export const fetchRentalHistory = () => dispatch => {
    console.log("fetch rental")
    fetch(backend+"api/bookings", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        
    })
    .then((res) => res.json())
    .then((rentalhistory) => 
    {
        dispatch({
            type: FETCH_RENTAL_CARS,
            payload: rentalhistory
        })
    }       
    )
}
// Function to fetch all users
export const fetchUsers = () => dispatch => {
    fetch(backend+"api/users", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        
    })
    .then((res) => res.json())
    .then((users) => 
    {
        dispatch({
            type: FETCH_USERS,
            payload: users
        })
    }       
    )
}
// Function to create a new report
export const createReport = (report) => dispatch => {
   
    fetch(backend+'api/reports', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(report)
        
    })
    .then((res) => {
        if (res.status === 200) {
            alert("Success")
        }
    })
}

// Function to edit a car
export const editCar = (car) => dispatch => {
    fetch(backend+`api/cars/${car.car_id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(car)
        
    })
    .then((res) => {
        if (res.status === 200) {
            console.log("edit success")
            dispatch(fetchCars())
        }
    })
}

// Function to edit a user
export const editUser = (user) => dispatch => {
    fetch(backend+`api/users/${user.user_id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(user)
        
    })
    .then((res) => {
        if (res.status === 200) {
            dispatch(fetchUsers())
        }
    })
}

// Function to delete a car
export const deleteCar = (car) => dispatch => {
    fetch(backend+`api/cars/${car.car_id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
        
        
    })
    .then((res) => {
        if (res.status === 200) {
            
            dispatch(fetchCars())
        }
    })
}

// Function to delete a user
export const deleteUser = (user) => dispatch => {
    fetch(backend+`api/users/${user.user_id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
        
        
    })
    .then((res) => {
        if (res.status === 200) {
            
            dispatch(fetchUsers())
        }
    })
}
