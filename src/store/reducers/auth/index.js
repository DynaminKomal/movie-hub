import { combineReducers } from 'redux'
import loginReducer from './login.reducer'
import forgetPasswordReducer from './forgetPassword.reducer'
import resetTokenReducer from './resetToken.reducer'
import signupRedcuer from './signUp.redcuer'

const authReducers = combineReducers({
    loginReducer,
    forgetPasswordReducer,
    resetTokenReducer,
    signupRedcuer
})

export default authReducers;