import { FETCH_CARS, BOOK_CAR, FETCH_BOOKING_DATES, FETCH_RETURN_DATES} from '../actions/types';

const initialState = {
    
    cars : [],
    car: {},
    bookingStatus: '',
    booking_dates: [],
    return_dates: []
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
        case FETCH_BOOKING_DATES:
        
        return {
            ...state,
            
            booking_dates: action.payload
        }
        case FETCH_RETURN_DATES:
        
        return {
            ...state,
            
            return_dates: action.payload
        }
        default:
            return state;
    }
}