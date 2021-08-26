import reducer, { initialState } from './reducer';
import {
    changePassword,
    changeUserDatas,
    CHECK_TOKEN,
    checkToken,
    createUser,
    FETCHING_NEW_USER_DATA,
    fetchUserData,
    LOGOUT,
    logout,
    NEW_USER_DATA,
    STOP_LOADING,
    TOKEN_VERIFIED,
} from './actions';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { NEW_ERROR_MESSAGE, NEW_MESSAGE } from '../Message/actions';

const middleware = [thunk.withExtraArgument({ api: 'http://localhost:5000' })];
const mockStore = configureStore(middleware);

const expectedState = {
    email: 'test',
    username: 'usernameTest',
    token: 'jwttoken',
    picture: '',
    _id: 'mongoID',
    socketID: '',
    isTokenBeingVerified: false,
};

const formData = {
    email: 'test@test.test',
    password: 'test',
    confPass: 'test',
    username: 'test',
};

jest.mock('axios');

describe('User Redux Store', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it('should return the state updated with new user datas', () => {
        const newState = reducer(undefined, {
            type: 'NEW_USER_DATA',
            payload: { ...expectedState },
        });

        expect(newState).toEqual({ ...expectedState, isLoading: false });
    });

    it('should return an error on fetch', () => {
        const store = mockStore({});
        const expectedActions = [
            { type: FETCHING_NEW_USER_DATA },
            { type: STOP_LOADING },
            {
                type: NEW_ERROR_MESSAGE,
                payload: {
                    message: 'Une erreur est survenue avec le serveur.',
                },
            },
        ];

        axios.mockImplementationOnce(() =>
            Promise.reject('Une erreur est survenue avec le serveur.')
        );

        return store.dispatch(fetchUserData(formData)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should return user datas', () => {
        const store = mockStore({});
        const expectedActions = [
            { type: FETCHING_NEW_USER_DATA },
            {
                type: NEW_USER_DATA,
                payload: {
                    email: 'test@test.test',
                    username: 'test',
                    token: 'jwt',
                },
            },
        ];

        axios.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    email: 'test@test.test',
                    username: 'test',
                    token: 'jwt',
                },
            })
        );

        return store.dispatch(fetchUserData(formData)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should return an error when creating new user account', () => {
        const store = mockStore({});
        const expectedActions = [
            { type: FETCHING_NEW_USER_DATA },
            { type: STOP_LOADING },
            {
                type: NEW_ERROR_MESSAGE,
                payload: {
                    message: 'Une erreur est survenue avec le serveur.',
                },
            },
        ];

        axios.mockImplementationOnce(() =>
            Promise.reject({
                data: {
                    message: 'Une erreur est survenue avec le serveur.',
                },
            })
        );

        return store.dispatch(createUser(formData)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should confirm account creation', () => {
        const store = mockStore({});
        const expectedActions = [
            { type: FETCHING_NEW_USER_DATA },
            { type: STOP_LOADING },
            {
                type: NEW_MESSAGE,
                payload: {
                    message: 'Votre compte a bien été créer !',
                },
            },
        ];

        axios.mockImplementationOnce(() =>
            Promise.resolve({
                message: 'Votre compte a bien été créer !',
            })
        );

        return store.dispatch(createUser(formData)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should fetch the token authorization', () => {
        const store = mockStore({});
        const expectedActions = [
            { type: CHECK_TOKEN },
            { type: TOKEN_VERIFIED },
        ];

        axios.mockImplementationOnce(() =>
            Promise.resolve({ isAuthorized: true })
        );

        return store.dispatch(checkToken('jwttoken')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should disconnect the user after failed token checking', () => {
        const store = mockStore({});
        const expectedActions = [{ type: CHECK_TOKEN }, { type: LOGOUT }];

        axios.mockImplementationOnce(() => Promise.resolve(false));

        return store.dispatch(checkToken('jwttoken')).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should display a message after user datas update & store the user datas', () => {
        const store = mockStore({ user: { token: 'jwt' } });
        const expectedActions = [
            { type: FETCHING_NEW_USER_DATA },
            {
                type: NEW_MESSAGE,
                payload: { message: 'Vos données ont été mis à jour' },
            },
            {
                type: NEW_USER_DATA,
                payload: { email: 'test', picture: 'test', username: 'test' },
            },
        ];

        axios.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    email: 'test',
                    picture: 'test',
                    username: 'test',
                },
            })
        );

        return store.dispatch(changeUserDatas({})).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should clear the state', () => {
        const expectedState = {
            ...initialState,
            email: '',
            token: '',
            username: '',
            picture: '',
            _id: '',
            socketID: '',
        };
        expect(reducer(undefined, logout())).toEqual(expectedState);
    });
});
