import { combineReducers } from 'redux'
import loginReducer from './login.reducer'
import forgetPasswordReducer from './forgetPassword.reducer'

const authReducers = combineReducers({
    loginReducer,
    forgetPasswordReducer
})

export default authReducers;