import { createRequestTypes, action } from "../../../utils/reducer";

export const SIGNUP = createRequestTypes("SIGNUP");

export const signUp = {
    request: (data) => action(SIGNUP.REQUEST, data),
    success: (data) => action(SIGNUP.SUCCESS, data),
    failure: (error) => action(SIGNUP.FAILURE, error),
};


export const RESET_SIGNUP = createRequestTypes("RESET_SIGNUP");
export const resetSignup = {
    success: (data) => action(RESET_SIGNUP, data)
}