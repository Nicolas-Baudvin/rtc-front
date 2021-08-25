import { io } from 'socket.io-client';
import { newErrorMessage, newMessage } from '../Message/actions';
import { newUserData } from '../UserData/actions';
import { newCurrentRoom } from '../Rooms/actions';

export const CLEAR_SOCKET = 'CLEAR_SOCKET';
export const NEW_SOCKET = 'NEW_SOCKET';

export const clearSocket = () => ({
    type: CLEAR_SOCKET,
});

export const newSocket = (payload) => ({
    type: NEW_SOCKET,
    payload,
});

function socketEventListener(socket, dispatch) {
    socket.on('message sent', (data) => {
        dispatch(newCurrentRoom(data.room));
    });

    socket.on('message error', (data) => {
        dispatch(newErrorMessage(data.error));
    });
}

export function connect() {
    return function (dispatch, getState) {
        const userData = {
            ...getState().user,
        };
        const socket = io('http://localhost:5000');
        dispatch(newSocket(socket));
        socket.emit('login', userData);
        socket.on('success authentication', (data) => {
            successAuth(data, dispatch);
            socketEventListener(socket, dispatch);
        });
        socket.on('failed authentication', (err) => failedAuth(err, dispatch));
    };
}

export function disconnect() {
    return function (dispatch, getState) {
        const userData = {
            ...getState().user,
        };
        const socket = getState().server.socket;
        dispatch(clearSocket());
        return socket.emit('disconnect client', userData);
    };
}

function successAuth(data, dispatch) {
    dispatch(newMessage('Service de chat en ligne'));
    dispatch(newUserData(data.user));
}

function failedAuth(data, dispatch) {
    dispatch(newErrorMessage(data.error));
}
