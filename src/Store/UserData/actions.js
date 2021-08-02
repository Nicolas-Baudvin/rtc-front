import axios from 'axios';

export const NEW_USER_DATA = 'NEW_USER_DATA';
export const NEW_USER_DATA_ERROR = 'NEW_USER_DATA_ERROR';

export const newUserData = (payload) => ({
    type: NEW_USER_DATA,
    payload,
});

export const newUserDataError = (payload) => ({
    type: NEW_USER_DATA_ERROR,
    payload,
});

function getUserData(api, payload) {
    return axios.post(`${api}/user/auth/`, { payload });
}

export function fetchUserData(payload) {
    return function (dispatch, getState, { api }) {
        if (getState.user.token) {
            return Promise.resolve();
        }

        return getUserData(api, payload)
            .then((user) => dispatch(newUserData(user)))
            .catch((err) =>
                dispatch(
                    newUserDataError({
                        message: 'Une erreur est survenue',
                        err,
                    })
                )
            );
    };
}