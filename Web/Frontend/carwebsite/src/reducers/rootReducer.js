import { combineReducers } from 'redux';
import customerReducer from "./customerReducer"
import adminReducer from './adminReducer'
import engineerReducer from './engineerReducer'
export default combineReducers({
    customerReducer: customerReducer,
    adminReducer: adminReducer,
    engineerReducer: engineerReducer
})