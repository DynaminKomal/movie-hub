import { combineReducers } from 'redux'
import loginReducer from './login.reducer'

const authReducers = combineReducers({
    loginReducer
})

export default authReducers;