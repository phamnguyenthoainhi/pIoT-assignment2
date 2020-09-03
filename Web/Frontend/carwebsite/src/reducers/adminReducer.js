import { 
    FETCH_RENTAL_CARS, 
    // FETCH_CARS,
    FETCH_USERS, 
    // CREATE_CAR, 
    // EDIT_CAR, 
    // EDIT_USER, 
    // DELETE_CAR
} from '../actions/types';

const initialState = {
    cars : [],
    car: {},
    users: [],
    user: {},
    rentalhistory: {}
}
export default function (state = initialState, action) {
    switch(action.type) {
        case FETCH_RENTAL_CARS:
            // console.log("reducer")
            return {
                ...state,
                rentalhistory: action.payload
            }
        case FETCH_USERS:
            return {
                ...state,
                users: action.payload
            } 
        
        default:
            return state;
    }
}