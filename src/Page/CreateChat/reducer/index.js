export const initialState = {
    roomName: '',
    roomPass: '',
    roomNameError: '',
    roomPassError: '',
};

export const makeAction = (type, payload) => ({
    type,
    payload,
});

export const dispatchByInputName = (inputName, dispatch) =>
    ({
        roomName: (e) => dispatch(makeAction('NEW_ROOM_NAME', e.target.value)),
        roomPass: (e) => dispatch(makeAction('NEW_ROOM_PASS', e.target.value)),
    }[inputName]);

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
