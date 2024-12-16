import { createRequestTypes, action } from "../../../utils/reducer";

export const FORGET_PASSWORD = createRequestTypes("FORGET_PASSWORD");

export const forgetPassword = {
    request: (data) => action(FORGET_PASSWORD.REQUEST, data),
    success: (data) => action(FORGET_PASSWORD.SUCCESS, data),
    failure: (error) => action(FORGET_PASSWORD.FAILURE, error),
};


export const RESET_FORGET_PASSWORD = "RESET_FORGET_PASSWORD";
export const resetForgetPassword = (data) => action(RESET_FORGET_PASSWORD, data)