import { combineReducers } from 'redux';
import userReducer from './UserData/reducer';

export const rootReducer = combineReducers({
    user: userReducer,
});

export default rootReducer;
