const initialState = {
    email: '',
    token: '',
    username: '',
    picture: '',
    _id: '',
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'NEW_USER_DATA': {
            return {
                ...state,
                ...action.payload,
            };
        }
        default:
            return state;
    }
}

export default reducer;
