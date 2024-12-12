import { createRequestTypes, action } from "../../../utils/reducer";

export const LOGIN = createRequestTypes("LOGIN");

export const login = {
    request: (data) => action(LOGIN.REQUEST, data),
    success: (data) => action(LOGIN.SUCCESS, data),
    failure: (error) => action(LOGIN.FAILURE, error),
};


export const RESET_LOGIN = "RESET_LOGIN";
export const resetLogin = (data) => action(RESET_LOGIN, data)