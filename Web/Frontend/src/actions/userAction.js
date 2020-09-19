import { LOGIN, LOGIN_FAILED, SIGNUP, SIGNUP_FAILED, FETCH_BOOKINGS, FETCH_BOOKING_DATES, FETCH_RETURN_DATES} from './types'
import {backend} from "./backend"

// Function to unclock a acar
export const unlock = (booking) => dispatch => {
    console.log("actionnn")
    fetch(backend+`/api/cars/${booking.car_id}/unlock`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
        
    })
    .then(res=> {
        if (res.status === 200) {
            dispatch(getBookingsbyUserid(booking.user_id))
        }
    })
}
// Function to lock a car
export const lock = (booking) => dispatch => {
    fetch(backend+`/api/cars/${booking.car_id}/lock`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
        
    })
    .then(res=> {
        if (res.status === 200) {
            dispatch(getBookingsbyUserid(booking.user_id))
        }
    })
}

// Function to login
export const login = (user) => dispatch => {
    
    fetch(backend+"login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(user)
        
    })
    .then (function(res) {
        if (res.status === 200) {
            
            res.json().then(function(data) {
                sessionStorage.setItem("id", data.user_id);
                sessionStorage.setItem("role", data.role);
                dispatch({
                    type: LOGIN,
                    payload: 'success'
                })
              })
        } 
        if (res.status === 401) {
            res.text().then(function(data) {
                dispatch({
                    type: LOGIN_FAILED,
                    payload: data
                })
              })
        } 
    })  
}

// Function to register
export const signup = (user, photo) => dispatch => {
    console.log(photo)
    fetch(backend+"register", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(user)
    })
    .then ((res) => {
        if (res.status === 201) {
            res.text().then(function(data) {
                dispatch(addPhoto(parseInt(data), photo))
              })
        } else if (res.status === 401) {
            res.text().then(function(data) {
                dispatch({
                    type: SIGNUP_FAILED,
                    payload: data
                })
              })
        }
    })    
}

// Function to add photo
export const addPhoto = (user_id, photo) => dispatch => {
    fetch(backend+`api/photos/${user_id}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(photo)
        
    })
    .then ((res) => {
        if (res.status === 201) {
            dispatch({
                type: SIGNUP,
                payload: 'success'
            })
        } else if (res.status === 401) {
            res.text().then(function(data) {
                dispatch({
                    type: SIGNUP_FAILED,
                    payload: data
                })
              })
        }
        else if (res.status === 200) {
            dispatch({
                type: SIGNUP,
                payload: 'success'
            })
        } 
    })    
}

// Function to fetch all bookings of a user
export const getBookingsbyUserid = (user_id) => dispatch => {
    fetch(backend+`api/users/${user_id}/bookings`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
    })
    .then((res) => res.json())
    .then((bookings) => 
    {
        dispatch({
            type: FETCH_BOOKINGS,
            payload: bookings
        })
    })
}

// Function to cancel a booking
export const cancelBooking = (booking) => dispatch => {
    fetch(backend+`api/bookings/${booking.booking_id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }  
    })
    .then((res) => {
        if(res.status === 200) {
            fetch(backend+`api/cars/${booking.car_id}/unlock`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }   
            })
            alert("Success Cancel Booking!")
            dispatch(getBookingsbyUserid(booking.user_id))
        }
    })
}

// Function to fetch all booking dates
export const getBookingDates = (car) => dispatch => {
    fetch(backend+`api/cars/${car.car_id}/booking_dates`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
    })
    .then((res) => res.json())
    .then((booking_dates) => 
    {
        dispatch({
            type: FETCH_BOOKING_DATES,
            payload: booking_dates
        })
    })
}

// Function to fetch all return dates
export const getReturnDates = (car) => dispatch => {   
    fetch(backend+`api/cars/${car.car_id}/return_dates`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }
    })
    .then((res) => res.json())
    .then((return_dates) => 
    {
        dispatch({
            type: FETCH_RETURN_DATES,
            payload: return_dates
        })
    })
}