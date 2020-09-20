import { FETCH_MOST_BOOKINGS, FETCH_LEAST_BOOKINGS, FETCH_MOST_REVENUES,  FETCH_CARMAKE, FETCH_MONTHLY_REVENUES} from './types';
import {backend} from './backend';

// Function to fetch 5 cars that have the most bookings
export const fetchMostBookings = () => dispatch => {
    fetch(backend+'api/cars/mostbookings', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }, 
    })
    .then((res) => res.json())
    .then((mostbookings) => 
    {
        dispatch({
            type: FETCH_MOST_BOOKINGS,
            payload: mostbookings
        })
    })
}

// Function to fetch number of bookings of each car make
export const fetchCarMakes = () => dispatch => {
    fetch(backend+'api/cars/countmake', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        },    
    })
    .then((res) => res.json())
    .then((carmakes) => 
    {
        dispatch({
            type: FETCH_CARMAKE,
            payload: carmakes
        })
    })
}

// Function to fetch 5 cars that have the least bookings
export const fetchLeastBookings = () => dispatch => {
    
    fetch(backend+'api/cars/leastbookings', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        },
    })
    .then((res) => res.json())
    .then((leastbookings) => 
    {
        dispatch({
            type: FETCH_LEAST_BOOKINGS,
            payload: leastbookings
        })
    })
}

// Function to fetch month revenues
export const fetchMonthlyRevenues = () => dispatch => {
    console.log("Hello")
    fetch(backend+'api/monthlyrevenues', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        },
        
    })
    .then((res) => res.json())
    .then((monthlyrevenues) => 
    {
        console.log(monthlyrevenues)
        dispatch({
            type: FETCH_MONTHLY_REVENUES,
            payload: monthlyrevenues
        })
    })
}

// Fetch 5 cars that produce the most revenues
export const fetchMostRevenues = () => dispatch => {
    fetch(backend+'api/cars/mostrevenues', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        },
        
    })
    .then((res) => res.json())
    .then((revenues) => 
    {
        dispatch({
            type: FETCH_MOST_REVENUES,
            payload: revenues
        })
    })
}