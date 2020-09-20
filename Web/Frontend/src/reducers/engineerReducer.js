import { 
    FETCH_REPORT
} from '../actions/types';

const initialState = {
    reports : {},
}

export default function (state = initialState, action) {
    switch(action.type) {
        case FETCH_REPORT:
            return {
                ...state,
                reports: action.payload
            }
        default:
            return state;
    }
}