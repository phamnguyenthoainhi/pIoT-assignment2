import { LOGIN, LOGIN_FAILED, SIGNUP, SIGNUP_FAILED} from './types'
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