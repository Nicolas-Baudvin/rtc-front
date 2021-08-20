import axios from 'axios';
import { get } from 'enzyme/build/configuration';
import { newErrorMessage } from '../Message/actions';
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
            username: getState().user.token,
        };
        return fetchRooms(userData)
            .then((res) => {
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

export function createRoom(payload) {
    return function (dispatch, getState) {
        const { socket } = getState().server;
        const userData = {
            email: getState().user.email,
            _id: getState().user._id,
            token: getState().user.token,
        };

        socket.emit('create room', { ...userData, ...payload });
        socket.on('room created', (data) =>
            dispatch(newCurrentRoom(data.room))
        );
        socket.on('create error', (data) =>
            dispatch(newErrorMessage(data.error))
        );
    };
}

export function joinRoom(payload) {
    return function (dispatch, getState) {
        const { socket } = getState().server;
        const userData = {
            email: getState().user.email,
            _id: getState().user._id,
            token: getState().user.token,
        };

        socket.emit('join room', { ...userData, ...payload });
        socket.on('room created', (data) =>
            dispatch(newCurrentRoom(data.room))
        );
        socket.on('join error', (data) =>
            dispatch(newErrorMessage(data.error))
        );
    };
}
