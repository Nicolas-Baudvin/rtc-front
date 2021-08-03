import reducer, { initialState } from './reducer';
import {
    FETCHING_NEW_USER_DATA,
    fetchUserData,
    logout,
    NEW_USER_DATA,
} from './actions';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import { NEW_ERROR_MESSAGE } from '../Message/actions';

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
                payload: { message: 'Votre compte a bien été créer' },
            },
        ];

        axios.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    message: 'Votre compte a bien été créer',
                },
            })
        );

        return store.dispatch(fetchUserData(formData)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    it('should clear the state', () => {
        expect(reducer(undefined, logout())).toEqual(initialState);
    });
});
