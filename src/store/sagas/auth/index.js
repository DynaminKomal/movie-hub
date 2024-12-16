import loginSaga from "./login.saga";
import forgetPasswordSaga from "./forgetPassword.saga";
import resetTokenSaga from "./resetToken.saga";

const authSagas = [
    loginSaga(),
    forgetPasswordSaga(),
    resetTokenSaga()
]

export default authSagas;