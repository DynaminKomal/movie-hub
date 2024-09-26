import { configureStore, applyMiddleware, compose} from '@reduxjs/toolkit';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers/index';
import sagas from './sagas/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const history = createBrowserHistory();

//create saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = configureStore(
    reducers,
    composeEnhancers(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(sagas)

export default store