import {
    CHECK_TOKEN,
    FETCHING_NEW_USER_DATA,
    LOGOUT,
    NEW_USER_DATA,
    STOP_LOADING,
    TOKEN_VERIFIED,
} from './actions';

function getUserDataFromLocalstorage() {
    const data = localStorage.getItem('user_datas');
    if (!data) {
        return '';
    }
    return JSON.parse(data);
}

export const initialState = {
    email: getUserDataFromLocalstorage()?.email,
    token: getUserDataFromLocalstorage()?.token,
    username: '',
    picture: '',
    _id: getUserDataFromLocalstorage()?._id,
    socketID: '',
    isLoading: false,
    isTokenBeingVerified: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case NEW_USER_DATA: {
            return {
                ...state,
                ...action.payload,
                isLoading: false,
            };
        }
        case FETCHING_NEW_USER_DATA: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case STOP_LOADING: {
            return {
                ...state,
                isLoading: false,
            };
        }
        case LOGOUT:
            localStorage.clear();
            return initialState;
        case CHECK_TOKEN: {
            return {
                ...state,
                isTokenBeingVerified: true,
            };
        }
        case TOKEN_VERIFIED: {
            return {
                ...state,
                isTokenBeingVerified: false,
            };
        }
        default:
            return state;
    }
}

export default reducer;
