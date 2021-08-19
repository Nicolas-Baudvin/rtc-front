import { CLEAR_SOCKET, NEW_SOCKET } from './actions';

const initialState = {
    socket: null,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case NEW_SOCKET: {
            return {
                ...state,
                socket: action.payload,
            };
        }
        case CLEAR_SOCKET: {
            return initialState;
        }
        default:
            return state;
    }
}

export default reducer;
