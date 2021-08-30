import axios from 'axios';
import { newErrorMessage, newMessage } from '../Message/actions';
import axiosErrorHandler from '../../Utils/axiosErrorHandler';

export const NEW_ROOMS = 'NEW_ROOMS';
export const CLEAR_ROOMS = 'CLEAR_ROOMS';
export const NEW_CURRENT_ROOM = 'NEW_CURRENT_ROOM';
export const LOADING_ROOMS = 'LOADING_ROOMS';

export const newRooms = (payload) => ({
    type: NEW_ROOMS,
    payload,
});

export const clearRooms = () => ({
    type: CLEAR_ROOMS,
});

export const newCurrentRoom = (payload) => ({
    type: NEW_CURRENT_ROOM,
    payload,
});

export const loadingRooms = () => ({
    type: LOADING_ROOMS,
});

/**
 * API Query
 */

async function fetchRooms(payload) {
    const { token, _id, email, username } = payload;
    return axios({
        url: 'http://localhost:5000/api/rooms/',
        method: 'post',
        data: {
            _id,
            email,
            username,
        },
        headers: {
            authorization: `Bearer ${token}`,
        },
    });
}

/**
 * Async Actions
 */

export function getRooms() {
    return function (dispatch, getState) {
        dispatch(loadingRooms());
        const userData = {
            email: getState().user.email,
            _id: getState().user._id,
            token: getState().user.token,
            username: getState().user.username,
            socketID: getState().user.socketID,
        };
        return fetchRooms(userData)
            .then((res) => {
                console.log(res.data);
                dispatch(newRooms(res.data.rooms));
            })
            .catch((err) => {
                axiosErrorHandler(err, dispatch);
            });
    };
}

/**
 * Socket
 */

/**
 *
 * @param payload - { roomName: string, roomPass: string }
 * @returns {(function(*, *): void)|*}
 */
export function createRoom(payload) {
    return function (dispatch, getState) {
        const { socket } = getState().server;
        const userData = {
            email: getState().user.email,
            _id: getState().user._id,
            token: getState().user.token,
            username: getState().user.username,
        };

        socket.emit('create room', { ...userData, ...payload });
        socket.on('room created', (data) => {
            dispatch(newCurrentRoom(data.room));
            dispatch(
                newMessage(
                    'Le salon a bien été créer, retrouvez le dans le menu vos salon !'
                )
            );
        });
        socket.on('create error', (data) =>
            dispatch(newErrorMessage(data.error))
        );
    };
}

/**
 *
 * @param payload - { roomName: string, roomPass: string }
 * @returns {(function(*, *): void)|*}
 */
export function joinRoom(payload) {
    return function (dispatch, getState) {
        const { socket } = getState().server;
        const userData = {
            email: getState().user.email,
            _id: getState().user._id,
            token: getState().user.token,
            username: getState().user.username,
        };

        socket.emit('join room', { ...userData, ...payload });
        socket.on('room joined', (data) => {
            dispatch(newCurrentRoom(data.room));
        });
        socket.on('join error', (data) =>
            dispatch(newErrorMessage(data.error))
        );
    };
}

export function sendMessage(payload) {
    return function (dispatch, getState) {
        const { socket } = getState().server;
        const { current } = getState().rooms;
        const userData = {
            email: getState().user.email,
            _id: getState().user._id,
            token: getState().user.token,
            username: getState().user.username,
            picture: getState().user.picture,
        };
        socket.emit('send message', {
            ...userData,
            message: payload,
            room: { name: current.name, _id: current._id },
        });
        socket.on('message sent', (data) => {
            console.log(data);
            dispatch(newCurrentRoom(data.room));
        });
        socket.on('message error', (data) => {
            console.log(data);
            dispatch(newErrorMessage(data.error));
        });
    };
}
