import { combineReducers } from 'redux';
import customerReducer from "./customerReducer"
import adminReducer from './adminReducer'
import engineerReducer from './engineerReducer'
import userReducer from './userReducer'
import managerReducer from './managerReducer'
export default combineReducers({
    customerReducer: customerReducer,
    adminReducer: adminReducer,
    engineerReducer:engineerReducer,
    userReducer: userReducer,
    managerReducer: managerReducer
})