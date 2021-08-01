export const initialState = {
    email: '',
    password: '',
    username: '',
    confPass: '',
};

export function reducer(state, action) {
    switch (action.type) {
        case 'NEW_PASSWORD': {
            return {
                ...state,
                password: action.payload,
            };
        }
        case 'NEW_USERNAME': {
            return {
                ...state,
                username: action.payload,
            };
        }
        case 'NEW_EMAIL': {
            return {
                ...state,
                email: action.payload,
            };
        }
        case 'NEW_CONF_PASS': {
            return {
                ...state,
                confPass: action.payload,
            };
        }
        default: {
            return state;
        }
    }
}
