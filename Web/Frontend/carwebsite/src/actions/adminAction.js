import { 
    FETCH_RENTAL_CARS, 
    FETCH_USERS, CREATE_CAR, EDIT_CAR, EDIT_USER, DELETE_CAR
} from './types';

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
export const createCar = (car) => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(car)
        
    })
    .then((res) => res.json())
}

export const editCar = (car) => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(car)
        
    })
    .then((res) => res.json())
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

export const deleteCar = (id) => dispatch => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        }
        
        
    })
    .then((res) => res.json())
}
