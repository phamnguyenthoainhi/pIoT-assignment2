import { FETCH_CARS, BOOK_CAR} from './types';
import {backend} from './backend';

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
// /api/cars/<int:car_id>/lock

export const bookCar = (booking) => dispatch => {
    console.log("book a car")
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
                console.log("ok ok")
                dispatch(fetchCars())
            }
        }
    )
   
}