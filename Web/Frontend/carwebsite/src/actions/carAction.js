import { FETCH_CARS, BOOK_CAR} from './types';
import {backend} from './backend';

export const fetchCars = () => dispatch => {
    
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

export const bookCar = (booking) => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(booking)
        
    })
    .then((res) => {
        if(res.status === 200) {
            dispatch({
                type: BOOK_CAR,
                payload: 'success'
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
    .then((res) => {fetchCars()})
}