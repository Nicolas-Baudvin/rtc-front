import { dispatchByInputName, inputs, makeAction } from './index';

describe('util', () => {
    const expectedType = 'ACTION';
    const expectedPayload = 'payload';
    it('should return an action', () => {
        const action = makeAction(expectedType, expectedPayload);
        expect(action.type).toEqual(expectedType);
        expect(action.payload).toEqual(expectedPayload);
    });

    it('should call dispatch', () => {
        const dispatch = jest.fn();
        const event = { target: { value: 'test' } };
        dispatchByInputName('email', dispatch, event)();
        expect(dispatch).toHaveBeenCalledTimes(1);
    });

    it('should return an array with 2 objects', () => {
        expect(inputs('login').length).toEqual(2);
    });

    it('should return an array with 4 objects', () => {
        expect(inputs('signup').length).toEqual(4);
    });
});
