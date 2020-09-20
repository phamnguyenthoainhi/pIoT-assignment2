import { FETCH_CARS, BOOK_CAR} from './types';
import {backend} from './backend';

// Function to fetch all cars
export const fetchCars = () => dispatch => {
    console.log("fetched cars")
    fetch(backend+'api/cars', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        },
        
    })
    .then((res) => res.json())
    .then((cars) => 
    {
        dispatch({
            type: FETCH_CARS,
            payload: cars
        })
    }       
    )
}

// Function to book a car/create a booking
export const bookCar = (booking) => dispatch => {
    fetch(backend+'api/bookings', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(booking)
        
    })
    .then((res) => {
        if(res.status === 200) {
            dispatch({
                type: BOOK_CAR,
                payload: 'success'
            })
            fetch(backend+`api/cars/${booking.car_id}/lock`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
                
            })
        } else {
            dispatch({
                type: BOOK_CAR,
                payload: 'Fail'
            })
        }
    })
}

// Function to create a car
export const createCar = (car) => dispatch => {
    fetch(backend+'api/cars', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(car)
        
    })
    .then((res) => 
        {
            if (res.status === 200) {
                
                dispatch(fetchCars())
            }
        }
    )
   
}