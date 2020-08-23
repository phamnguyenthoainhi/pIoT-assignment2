import { FETCH_CARS, BOOK_CAR} from '../actions/types';

const initialState = {
    
    cars : [],
    car: {},
    bookingStatus: ''
}
export default function (state = initialState, action) {
    switch(action.type) {
        case FETCH_CARS:
            // console.log("reducer")
            // console.log(action.payload)
            return {
                ...state,
                cars: action.payload
            }
        case BOOK_CAR:
        // console.log("reducer")
        return {
            ...state,
            bookingStatus: action.payload
        }
        default:
            return state;
    }
}