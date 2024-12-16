import { createRequestTypes, action } from "../../../utils/reducer";

export const RESET_TOKEN = createRequestTypes("RESET_TOKEN");

export const resetToken = {
    request: (data) => action(RESET_TOKEN.REQUEST, data),
    success: (data) => action(RESET_TOKEN.SUCCESS, data),
    failure: (error) => action(RESET_TOKEN.FAILURE, error),
};


export const RESET_RESET_TOKEN = "RESET_RESET_TOKEN";
export const reset_resetToken = (data) => action(RESET_RESET_TOKEN, data)