import * as currentPage from "../actions/currentPage.action";
import * as subCurrentPage from "../actions/currentPage.action";

const initialState = {
    currentPage: "",
    currentPath: "",
    subCurrentPage: "",
    subCurrentPath: ""

}


export default function returnstate(state = initialState, action) {
    switch (action.type) {
        case currentPage.CURRENT_PAGE.SUCCESS:

            return {
                ...state,
                currentPage: action.payload.currentPage,
                currentPath: action.payload.currentPath
            };
        case subCurrentPage.SUB_CURRENT_PAGE.SUCCESS:

            return {
                ...state,
                subCurrentPage: action.payload.subCurrentPage,
                subCurrentPath: action.payload.suCurrentPath
            };

        default: return state
    }
}