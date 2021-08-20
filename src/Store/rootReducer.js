import { combineReducers } from 'redux';
import userReducer from './UserData/reducer';
import messageReducer from './Message/reducer';
import serverReducer from './WebSocket/reducer';
import roomsReducer from './Rooms/reducer';

export const rootReducer = combineReducers({
    user: userReducer,
    popup: messageReducer,
    server: serverReducer,
    rooms: roomsReducer,
});

export default rootReducer;
