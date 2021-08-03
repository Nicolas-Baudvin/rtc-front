import reducer, { initialState } from './reducer';
import {
    FETCHING_NEW_USER_DATA,
    fetchUserData,
    NEW_USER_DATA,
    NEW_USER_DATA_ERROR,
} from './actions';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

const middleware = [thunk.withExtraArgument({ api: 'http://localhost:5000' })];
const mockStore = configureStore(middleware);

const expectedState = {
    email: 'test',
    username: 'usernameTest',
    token: 'jwttoken',
    picture: '',
    _id: 'mongoID',
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
                type: NEW_USER_DATA_ERROR,
                payload: { message: 'Une erreur est survenue' },
            },
        ];

        axios.mockImplementationOnce(() =>
            Promise.reject(new Error('Une erreur est survenue'))
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
            Promise.resolve({ message: 'Votre compte a bien été créer' })
        );

        return store.dispatch(fetchUserData(formData)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
