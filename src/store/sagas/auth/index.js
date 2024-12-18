import loginSaga from "./login.saga";
import forgetPasswordSaga from "./forgetPassword.saga";
import resetTokenSaga from "./resetToken.saga";
import signupSaga from "./signUp.saga";

const authSagas = [
    loginSaga(),
    forgetPasswordSaga(),
    resetTokenSaga(),
    signupSaga()
]

export default authSagas;