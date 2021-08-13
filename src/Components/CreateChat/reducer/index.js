export const initialState = {
    roomName: '',
    roomPass: '',
    roomNameError: '',
    roomPassError: '',
};

export function reducer(state, action) {
    switch (action.type) {
        case 'NEW_ROOM_NAME': {
            return {
                ...state,
                roomName: action.payload,
            };
        }
        case 'NEW_ROOM_PASS': {
            return {
                ...state,
                roomPass: action.payload,
            };
        }
        default:
            return state;
    }
}
