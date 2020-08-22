import { 
    LOGIN, LOGIN_FAILED, SIGNUP, SIGNUP_FAILED
} from '../actions/types';

const initialState = {
    login_message: "",
    signup_message: "",
    loginsuccess: "",
    signupsuccess: ""
   
}

export default function (state = initialState, action) {
    switch(action.type) {
        case LOGIN:
            return {
                ...state,
                loginsuccess: action.payload
            }
        case LOGIN_FAILED:
            return {
                ...state,
                login_message: action.payload
            }
        case SIGNUP:
            return {
                ...state,
                signupsuccess: action.payload
            }
        case SIGNUP_FAILED:
            return {
                ...state,
                signup_message: action.payload
            }
        default:
            return state;
    }
}



