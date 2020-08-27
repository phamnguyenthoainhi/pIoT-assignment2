import { LOGIN, LOGIN_FAILED, SIGNUP, SIGNUP_FAILED, FETCH_BOOKINGS} from './types'
import {backend} from "./backend"
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
    console.log("action")
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
            alert("Success Cancel Booking!")
            fetch(backend+`api/cars/${booking.car_id}/unlock`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
                
            })
        }
        
    })
}
