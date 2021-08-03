import reducer, { initialState } from './reducer';
import { clearMessage, newErrorMessage, newMessage } from './actions';

describe('Message Redux Store', () => {
    it('should return the initialState', () => {
        const finalState = reducer(undefined, {});
        expect(finalState).toEqual(initialState);
    });

    it('should return the state with a message', () => {
        const expectedState = {
            message: 'Nouveau message de succès',
            isError: false,
        };
        expect(
            reducer(undefined, newMessage('Nouveau message de succès'))
        ).toEqual(expectedState);
    });

    it('should return the state with an error message', () => {
        const expectedState = {
            message: "Nouveau message d'erreur",
            isError: true,
        };
        expect(
            reducer(undefined, newErrorMessage("Nouveau message d'erreur"))
        ).toEqual(expectedState);
    });

    it('should clear the state and restores it as default', () => {
        expect(reducer(undefined, clearMessage())).toEqual(initialState);
    });
});
