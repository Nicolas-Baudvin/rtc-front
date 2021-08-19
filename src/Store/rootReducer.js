import { combineReducers } from 'redux';
import userReducer from './UserData/reducer';
import messageReducer from './Message/reducer';
import serverReducer from './WebSocket/reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    popup: messageReducer,
    server: serverReducer,
});

export default rootReducer;
