import { combineReducers } from 'redux';
import userReducer from './UserData/reducer';
import messageReducer from './Message/reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    popup: messageReducer,
});

export default rootReducer;
