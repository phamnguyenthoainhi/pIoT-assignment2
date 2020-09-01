import { LOGIN, LOGIN_FAILED, SIGNUP, SIGNUP_FAILED, FETCH_BOOKINGS, FETCH_BOOKING_DATES, FETCH_RETURN_DATES} from './types'
import {backend} from "./backend"
import {fetchRentalHistory} from "./adminAction"



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

export const signup = (user) => dispatch => {
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
        console.log(res.status)
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
        
    })    
}


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
    }       
    )
}

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
    }       
    )
}
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
    }       
    )
}