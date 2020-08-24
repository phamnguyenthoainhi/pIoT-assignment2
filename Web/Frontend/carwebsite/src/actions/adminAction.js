import { 
    FETCH_RENTAL_CARS, 
    FETCH_USERS, CREATE_CAR, EDIT_CAR, EDIT_USER, DELETE_CAR
} from './types';
import {backend} from './backend'
import {fetchCars} from './carAction';
export const fetchRentalHistory = () => dispatch => {
    
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
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
export const fetchUsers = () => dispatch => {
    
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
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
// export const createCar = (car) => dispatch => {
//     fetch(backend+'api/cars', {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             'Content-type': 'application/json',
//             "Access-Control-Allow-Origin": "*"
//         },
//         body: JSON.stringify(car)
        
//     })
//     .then((res) => {return res.json()})
// }

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
        fetchCars()
    })
}

export const editUser = (user) => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(user)
        
    })
    .then((res) => res.json())
}

export const deleteCar = (car) => dispatch => {
    fetch(backend+`api/cars/${car.car_id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
        
        
    })
    .then((res) => fetchCars())
}
