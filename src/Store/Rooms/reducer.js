import {
    CLEAR_ROOMS,
    LOADING_ROOMS,
    NEW_CURRENT_ROOM,
    NEW_ROOMS,
} from './actions';

export const initialState = {
    all: [],
    current: null,
    isLoading: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case NEW_ROOMS: {
            return {
                ...state,
                all: action.payload,
                isLoading: false,
            };
        }
        case CLEAR_ROOMS: {
            return {
                ...state,
                all: [],
                current: null,
            };
        }
        case NEW_CURRENT_ROOM: {
            return {
                ...state,
                current: action.payload,
                isLoading: false,
            };
        }
        case LOADING_ROOMS: {
            return {
                ...state,
                isLoading: true,
            };
        }
        default:
            return state;
    }
}

export default reducer;
