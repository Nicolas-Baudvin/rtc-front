import axios from 'axios';
import { newErrorMessage } from '../Message/actions';

export const NEW_USER_DATA = 'NEW_USER_DATA';
export const FETCHING_NEW_USER_DATA = 'FETCHING_NEW_USER_DATA';
export const LOGOUT = 'LOGOUT';

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

function getUserData(api, payload) {
    return axios({
        url:
            payload.page === 'signup'
                ? 'http://localhost:5000/api/user/'
                : 'http://localhost:5000/api/user/auth/',
        method: 'post',
        data: {
            ...payload,
        },
    });
}

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

export function fetchUserData(payload) {
    return function (dispatch, getState, { api }) {
        dispatch(fetchingNewUserData());

        return getUserData(api, payload)
            .then((user) => dispatch(newUserData(user.data)))
            .catch((error) =>
                dispatch(newErrorMessage(handleError(error, dispatch)))
            );
    };
}
