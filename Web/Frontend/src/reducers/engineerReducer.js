import { 
    FETCH_REPORT
} from '../actions/types';

const initialState = {
    reports : {},
   
}
export default function (state = initialState, action) {
    switch(action.type) {
        case FETCH_REPORT:
            console.log(action.payload)
            return {
                ...state,
                reports: action.payload
            }
        // case FETCH_USERS:
        //     return {
        //         ...state,
        //         users: action.payload
        //     } 
        
        default:
            return state;
    }
}