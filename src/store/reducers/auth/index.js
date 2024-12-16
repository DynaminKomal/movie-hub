import { combineReducers } from 'redux'
import loginReducer from './login.reducer'
import forgetPasswordReducer from './forgetPassword.reducer'
import resetTokenReducer from './resetToken.reducer'

const authReducers = combineReducers({
    loginReducer,
    forgetPasswordReducer,
    resetTokenReducer
})

export default authReducers;