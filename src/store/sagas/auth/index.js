import loginSaga from "./login.saga";
import forgetPasswordSaga from "./forgetPassword.saga";

const authSagas = [
    loginSaga(),
    forgetPasswordSaga()
]

export default authSagas;