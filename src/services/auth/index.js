import { ApiEndpoints } from "../../constants/api/auth";
import axiosInstance from "../interceptor";

export const loginAPI = {
    postLogin: (data) => {
        return axiosInstance.post(ApiEndpoints.login.url, data);
    },
}

export const forgetPasswordAPI = {
    postForgetPassword: (data) => {
        return axiosInstance.post(ApiEndpoints.forgetPassword.url, data);
    },
}

export const resetTokenAPI = {
    patchResetToken: (data) => {
        return axiosInstance.patch(ApiEndpoints.resetToken.url.replace(':token', data.token), {
            password: data.password,
            passwordConfirm: data.confirmPassword
        });
    },
}

export const signUpdAPI = {
    postSignup: (data) => {
        return axiosInstance.post(ApiEndpoints.signup.url, data);
    },
}