import { combineReducers } from 'redux';
import movieReducers from './movies/index';
import authReducers from './auth/index';

const createRootReducer = combineReducers({
    auth: authReducers,
    movie: movieReducers,
});

const rootReducer = (state, action) => {
    return createRootReducer(state, action);
};

export default rootReducer;
