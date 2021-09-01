import axios from 'axios';
import { newErrorMessage, newMessage } from '../Message/actions';
import axiosErrorHandler from '../../Utils/axiosErrorHandler';

export const NEW_ROOMS = 'NEW_ROOMS';
export const CLEAR_ROOMS = 'CLEAR_ROOMS';
export const NEW_CURRENT_ROOM = 'NEW_CURRENT_ROOM';
export const LOADING_ROOMS = 'LOADING_ROOMS';
export const CLEAR_CURRENT_ROOM = 'CLEAR_CURRENT_ROOM';

export const clearCurrentRoom = () => ({
    type: CLEAR_CURRENT_ROOM,
});

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
 * Utils
 */

function getUserDataFromState(state) {
    const { email, _id, token, username, socketID } = state.user;
    return {
        email,
        _id,
        token,
        username,
        socketID,
    };
}

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
        const userData = getUserDataFromState(getState());
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

/**
 *
 * @param payload - { roomName: string, roomPass: string }
 * @returns {(function(*, *): void)|*}
 */
export function createRoom(payload) {
    return function (dispatch, getState) {
        const { socket } = getState().server;
        const userData = getUserDataFromState(getState());

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
        const userData = getUserDataFromState(getState());

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
        const userData = getUserDataFromState(getState());
        socket.emit('send message', {
            ...userData,
            message: payload,
            room: { name: current.name, _id: current._id },
        });
        socket.on('message error', (data) => {
            dispatch(newErrorMessage(data.error));
        });
    };
}

export function disconnectFromRoom() {
    return function (dispatch, getState) {
        const { socket } = getState().server;
        const { current } = getState().rooms;
        const userData = getUserDataFromState(getState());

        socket.emit('member disconnect', {
            ...userData,
            room: { name: current.name, _id: current._id },
        });

        socket.on('disconnected success', () => {
            dispatch(
                newMessage(`Vous êtes déconnectés du salon ${current.name}`)
            );
            dispatch(clearCurrentRoom());
        });

        socket.on('disconnect error', (err) => {
            dispatch(
                newErrorMessage(
                    'Une erreur est survenue lors de la tentative de déconnexion.'
                )
            );
        });
    };
}
