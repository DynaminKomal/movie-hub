import { createRequestTypes, action } from "../../../utils/reducer";

export const FETCH_BANNER = createRequestTypes("FETCH_BANNER");
export const fetchBanner = {
    request: (data) => action(FETCH_BANNER.REQUEST, data),
    success: (data) => action(FETCH_BANNER.SUCCESS, data),
    failure: (error) => action(FETCH_BANNER.FAILURE, error),
};