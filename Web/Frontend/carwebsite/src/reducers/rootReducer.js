import { combineReducers } from 'redux';
import customerReducer from "./customerReducer"
import adminReducer from './adminReducer'
export default combineReducers({
    customerReducer: customerReducer,
    adminReducer: adminReducer
})