import axios from 'axios';
import { newErrorMessage, newMessage } from '../Message/actions';

export const NEW_USER_DATA = 'NEW_USER_DATA';
export const FETCHING_NEW_USER_DATA = 'FETCHING_NEW_USER_DATA';
export const LOGOUT = 'LOGOUT';
export const STOP_LOADING = 'STOP_LOADING';

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
