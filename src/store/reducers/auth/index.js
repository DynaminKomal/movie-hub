import { combineReducers } from 'redux'
import loginReducer from './login.reducer'
import forgetPasswordReducer from './forgetPassword.reducer'
import resetTokenReducer from './resetToken.reducer'
import signupReducer from './signUp.redcuer'
import validateCodeReducer from './validateCode.reducer'

const authReducers = combineReducers({
    loginReducer,
    forgetPasswordReducer,
    resetTokenReducer,
    signupReducer,
    validateCodeReducer
})

export default authReducers;