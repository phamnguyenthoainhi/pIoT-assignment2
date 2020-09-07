import { FETCH_MOST_BOOKINGS, FETCH_LEAST_BOOKINGS, FETCH_MOST_REVENUES } from '../actions/types';

const initialState = {
    mostbookings : [],
    leastbookings: [],
    revenues: []
   
}
export default function (state = initialState, action) {
    switch(action.type) {
        case FETCH_MOST_BOOKINGS:
            
            return {
                ...state,
                mostbookings: action.payload
            }
        case FETCH_LEAST_BOOKINGS:
            
            return {
                ...state,
                leastbookings: action.payload
            }
        case FETCH_MOST_REVENUES:
    
        return {
            ...state,
            revenues: action.payload
        }
        
        default:
            return state;
    }
}