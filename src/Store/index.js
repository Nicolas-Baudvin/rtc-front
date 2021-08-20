import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';

const middlewares = applyMiddleware(thunk);

const withReduxDevTools = compose;

const reactModelStore = createStore(
    rootReducer,
    process.env.NODE_ENV === 'development'
        ? withReduxDevTools(middlewares)
        : middlewares
);

export default reactModelStore;
