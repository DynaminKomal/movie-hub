import { combineReducers } from 'redux';
import movieReducers from './movies/index';
import authReducers from './auth/index';
import currentPage from './currentPage.reducer'

const createRootReducer = combineReducers({
    auth: authReducers,
    movie: movieReducers,
    page: currentPage
});

const rootReducer = (state, action) => {
    return createRootReducer(state, action);
};

export default rootReducer;
