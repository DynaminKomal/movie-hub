import { combineReducers } from "redux";

// import all reducers is here


const createRootReducer = combineReducers({
    // router:connectRouter(history),


})

const rootReducers = (state, action) => {
    return createRootReducer(state, action);
}
export default rootReducers;