import reducer, { initialState } from './reducer';
import {
    createUser,
    FETCHING_NEW_USER_DATA,
    fetchUserData,
    logout,
    NEW_USER_DATA,
    STOP_LOADING,
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

    it('should clear the state', () => {
        expect(reducer(undefined, logout())).toEqual(initialState);
    });
});
