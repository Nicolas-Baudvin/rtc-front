import {
    FETCHING_NEW_USER_DATA,
    LOGOUT,
    NEW_USER_DATA,
    NEW_USER_DATA_ERROR,
} from './actions';

export const initialState = {
    email: '',
    token: '',
    username: '',
    picture: '',
    _id: '',
    socketID: '',
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
        case LOGOUT:
            localStorage.clear();
            return initialState;
        default:
            return state;
    }
}

export default reducer;
