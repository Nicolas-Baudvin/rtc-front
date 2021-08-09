import axios from 'axios';
import { newErrorMessage, newMessage } from '../Message/actions';

/**
 * Actions types
 */

export const NEW_USER_DATA = 'NEW_USER_DATA';
export const FETCHING_NEW_USER_DATA = 'FETCHING_NEW_USER_DATA';
export const LOGOUT = 'LOGOUT';
export const STOP_LOADING = 'STOP_LOADING';
export const CHECK_TOKEN = 'CHECK_TOKEN';
export const TOKEN_VERIFIED = 'TOKEN_VERIFIED';

/**
 * Simple redux actions
 */

export const tokenVerified = () => ({
    type: TOKEN_VERIFIED,
});

export const checkingToken = () => ({
    type: CHECK_TOKEN,
});

export const stopLoading = () => ({
    type: STOP_LOADING,
});

export const fetchingNewUserData = () => ({
    type: FETCHING_NEW_USER_DATA,
});

export const newUserData = (payload) => ({
    type: NEW_USER_DATA,
    payload,
});

export const logout = () => ({
    type: LOGOUT,
});

/**
 * Error handler for api query
 */

function handleError(error, dispatch) {
    if (error?.response?.status === 403) {
        dispatch(logout());
        return 'Accès refusé';
    }
    if (error?.response?.data?.error) {
        return error.response.data.error;
    } else if (error?.response?.data?.errors) {
        return error.response.data.errors[0].msg;
    } else {
        return 'Une erreur est survenue avec le serveur.';
    }
}

/**
 * API Query
 */

function getUserData(payload) {
    return axios({
        url: 'http://localhost:5000/api/user/auth/',
        method: 'post',
        data: {
            ...payload,
        },
    });
}

function setUserData(payload) {
    return axios({
        url: 'http://localhost:5000/api/user/',
        method: 'post',
        data: {
            ...payload,
        },
    });
}

function fetchTokenAuthorization({ token }) {
    return axios({
        url: 'http://localhost:5000/api/user/check/',
        method: 'post',
        headers: {
            authorization: token,
        },
    });
}

/**
 * Async Actions
 */

export function createUser(payload) {
    return function (dispatch) {
        dispatch(fetchingNewUserData());

        return setUserData(payload)
            .then((data) => {
                dispatch(stopLoading());
                dispatch(newMessage(data.message));
            })
            .catch((error) => {
                dispatch(stopLoading());
                dispatch(newErrorMessage(handleError(error, dispatch)));
            });
    };
}

export function fetchUserData(payload) {
    return function (dispatch) {
        dispatch(fetchingNewUserData());

        return getUserData(payload)
            .then((user) => {
                const data = {
                    token: user.data.token,
                    email: user.data.email,
                    _id: user.data._id,
                };
                localStorage.setItem('user_datas', JSON.stringify(data));
                dispatch(newUserData(user.data));
            })
            .catch((error) => {
                dispatch(stopLoading());
                dispatch(newErrorMessage(handleError(error, dispatch)));
            });
    };
}

export function checkToken(payload) {
    return function (dispatch) {
        dispatch(checkingToken());
        return fetchTokenAuthorization(payload)
            .then((isAuthorized) => {
                if (!isAuthorized) {
                    return dispatch(logout());
                }
                return dispatch(tokenVerified());
            })
            .catch((err) => {
                console.error(err);
                return dispatch(logout());
            });
    };
}
