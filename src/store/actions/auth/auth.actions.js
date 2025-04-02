
import { createRequestTypes, action } from "../../../utils/reducer";


export const LOGIN = createRequestTypes("LOGIN");

export const login = {
    request: (data) => action(LOGIN.REQUEST, data),
    success: (data) => action(LOGIN.SUCCESS, data),
    failure: (error) => action(LOGIN.FAILURE, error),
};


export const RESET_LOGIN = createRequestTypes("RESET_LOGIN");
export const resetLogin = {
    success: (data) => action(RESET_LOGIN, data)
}

export const SIGNUP = createRequestTypes("SIGNUP");

export const signUp = {
    request: (data) => action(SIGNUP.REQUEST, data),
    success: (data) => action(SIGNUP.SUCCESS, data),
    failure: (error) => action(SIGNUP.FAILURE, error),
};


export const RESET_SIGNUP = createRequestTypes("RESET_SIGNUP");
export const resetSignup = {
    success: (data) => action(RESET_SIGNUP.SUCCESS, data)
}

export const FORGET_PASSWORD = createRequestTypes("FORGET_PASSWORD");

export const forgetPassword = {
    request: (data) => action(FORGET_PASSWORD.REQUEST, data),
    success: (data) => action(FORGET_PASSWORD.SUCCESS, data),
    failure: (error) => action(FORGET_PASSWORD.FAILURE, error),
};


export const RESET_FORGET_PASSWORD = createRequestTypes("RESET_FORGET_PASSWORD");

export const resetForgetPassword = {
    success: (data) => action(RESET_FORGET_PASSWORD.SUCCESS, data)
}


export const VALIDATE_CODE = createRequestTypes("VALIDATE_CODE");

export const validateCode = {
    request: (data) => action(VALIDATE_CODE.REQUEST, data),
    success: (data) => action(VALIDATE_CODE.SUCCESS, data),
    failure: (error) => action(VALIDATE_CODE.FAILURE, error),
};


export const RESET_VALIDATE_CODE = createRequestTypes("RESET_VALIDATE_CODE");
export const resetValidateCode = {
    success: (data) => action(RESET_VALIDATE_CODE.SUCCESS, data)
}


export const RESET_TOKEN = createRequestTypes("RESET_TOKEN");

export const resetToken = {
    request: (data) => action(RESET_TOKEN.REQUEST, data),
    success: (data) => action(RESET_TOKEN.SUCCESS, data),
    failure: (error) => action(RESET_TOKEN.FAILURE, error),
};


export const RESET_RESET_TOKEN = createRequestTypes("RESET_RESET_TOKEN");
export const reset_resetToken = {
    success: (data) => action(RESET_RESET_TOKEN, data)
}