import { combineReducers } from 'redux';
import movieReducers from './movies/index'; 

const createRootReducer = combineReducers({
    movie: movieReducers, 
});

const rootReducer = (state, action) => {
    return createRootReducer(state, action);
};

export default rootReducer;
