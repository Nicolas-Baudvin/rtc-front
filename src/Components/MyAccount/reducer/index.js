export const initialState = (data) => ({
    email: data.email,
    username: data.username,
    picture: data.picture,
});

export function reducer(state, action) {
    switch (action.type) {
        case 'NEW_EMAIL_VALUE': {
            return {
                ...state,
                email: action.payload,
            };
        }
        case 'NEW_USERNAME_VALUE': {
            return {
                ...state,
                username: action.payload,
            };
        }
        case 'NEW_PICTURE_VALUE': {
            return {
                ...state,
                picture: action.payload,
            };
        }
        case 'NEW_OLD_PASS_VALUE': {
            return {
                ...state,
                oldPass: action.payload,
            };
        }
        case 'NEW_PASSWORD_VALUE': {
            return {
                ...state,
                newPass: action.payload,
            };
        }
        case 'NEW_PASSWORD_CONF_VALUE': {
            return {
                ...state,
                newPassConf: action.payload,
            };
        }
        default:
            return state;
    }
}

export const NEW_EMAIL_VALUE = 'NEW_EMAIL_VALUE';
export const NEW_USERNAME_VALUE = 'NEW_USERNAME_VALUE';
export const NEW_PICTURE_VALUE = 'NEW_PICTURE_VALUE';
export const NEW_OLD_PASS_VALUE = 'NEW_OLD_PASS_VALUE';
export const NEW_PASSWORD_VALUE = 'NEW_PASSWORD_VALUE';
export const NEW_PASSWORD_CONF_VALUE = 'NEW_PASSWORD_CONF_VALUE';

export const newEmailValue = (payload) => ({
    type: NEW_EMAIL_VALUE,
    payload,
});

export const newUsernameValue = (payload) => ({
    type: NEW_USERNAME_VALUE,
    payload,
});

export const newPictureValue = (payload) => ({
    type: NEW_PICTURE_VALUE,
    payload,
});

export const newOldPassValue = (payload) => ({
    type: NEW_OLD_PASS_VALUE,
    payload,
});

export const newPasswordValue = (payload) => ({
    type: NEW_PASSWORD_VALUE,
    payload,
});

export const newPassConfValue = (payload) => ({
    type: NEW_PASSWORD_CONF_VALUE,
    payload,
});
