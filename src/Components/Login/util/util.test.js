import { checkFields, dispatchByInputName, inputs, makeAction } from './index';

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

describe('checkFields', () => {
    const fields = {
        email: 'test@hotmail.fr',
        username: 'TestTest1',
        password: '12345678',
        confPass: '12345678',
    };
    it('should return no error', () => {
        const errors = checkFields(fields);
        for (let field in errors) {
            expect(errors[field]).toBeFalsy();
        }
    });

    it('should return an error on email : email is not valid', () => {
        const newFields = { ...fields, email: 'test.test.com' };
        const errors = checkFields(newFields);
        expect(errors.email).toBeTruthy();
        expect(errors.username).toBeFalsy();
        expect(errors.password).toBeFalsy();
        expect(errors.confPass).toBeFalsy();
    });

    it('should return an error on username: username not valid', () => {
        const newFields = { ...fields, username: 'test' };
        const errors = checkFields(newFields);
        expect(errors.email).toBeFalsy();
        expect(errors.username).toBeTruthy();
        expect(errors.password).toBeFalsy();
        expect(errors.confPass).toBeFalsy();
    });

    it('should return an error on password : password not valid', () => {
        const newFields = { ...fields, password: 'test', confPass: 'test' };
        const errors = checkFields(newFields);
        expect(errors.email).toBeFalsy();
        expect(errors.username).toBeFalsy();
        expect(errors.password).toBeTruthy();
        expect(errors.confPass).toBeFalsy();
    });

    it('should return an error on confPass : passwords not equal', () => {
        const newFields = { ...fields, confPass: 'test' };
        const errors = checkFields(newFields);
        expect(errors.email).toBeFalsy();
        expect(errors.username).toBeFalsy();
        expect(errors.password).toBeFalsy();
        expect(errors.confPass).toBeTruthy();
    });

    it('should return an error on each field', () => {
        const newFields = {
            confPass: 'test',
            email: '',
            username: '',
            password: 'ui',
        };
        const errors = checkFields(newFields);
        for (let field in errors) {
            expect(errors[field]).toBeTruthy();
        }
    });
});
