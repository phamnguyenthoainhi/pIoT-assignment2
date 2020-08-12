import { FETCH_CARS, BOOK_CAR} from './types';


export const fetchCars = () => dispatch => {
    
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
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
            'Content-type': 'application/json'
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