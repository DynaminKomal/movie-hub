import { createRequestTypes, action } from "../../utils/reducer";

export const CURRENT_PAGE = createRequestTypes("CURRENT_PAGE");

export const currentPage = {
    success: (data) => action(CURRENT_PAGE.SUCCESS, data),
};


export const SUB_CURRENT_PAGE = createRequestTypes("SUB_CURRENT_PAGE");

export const subCurrentPage = {
    success: (data) => action(SUB_CURRENT_PAGE.SUCCESS, data),
};
