export const NEW_MESSAGE = 'NEW_MESSAGE';
export const NEW_ERROR_MESSAGE = 'NEW_ERROR_MESSAGE';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

export function clearMessage() {
    return {
        type: CLEAR_MESSAGE,
    };
}

export function newMessage(message) {
    return {
        type: NEW_MESSAGE,
        payload: { message },
    };
}

export function newErrorMessage(message) {
    return {
        type: NEW_ERROR_MESSAGE,
        payload: { message },
    };
}
