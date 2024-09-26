import { combineReducers } from 'redux';
import userReducers from './users/index'; 

const createRootReducer = combineReducers({
    user: userReducers, 
});

const rootReducer = (state, action) => {
    return createRootReducer(state, action);
};

export default rootReducer;
