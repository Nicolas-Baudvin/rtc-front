import { CLEAR_MESSAGE, NEW_ERROR_MESSAGE, NEW_MESSAGE } from './actions';

export const initialState = {
    message: '',
    isError: false,
    isShow: false,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case NEW_MESSAGE: {
            return {
                ...state,
                ...action.payload,
                isShow: true,
            };
        }
        case NEW_ERROR_MESSAGE: {
            return {
                ...state,
                ...action.payload,
                isError: true,
                isShow: true,
            };
        }
        case CLEAR_MESSAGE: {
            return initialState;
        }
        default:
            return state;
    }
}

export default reducer;
