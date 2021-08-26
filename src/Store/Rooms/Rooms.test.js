import reducer from './reducer';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import {
    clearRooms,
    getRooms,
    LOADING_ROOMS,
    NEW_ROOMS,
    newCurrentRoom,
    newRooms,
} from './actions';

const middleware = [thunk];
const mockStore = configureStore(middleware);

jest.mock('axios');

describe('Room Redux Store', () => {
    it('should return the initial state', () => {
        const state = reducer(undefined, {});
        expect(state).toEqual({ all: [], current: null, isLoading: false });
    });

    it('should clear the state', () => {
        const state = reducer(undefined, clearRooms());
        expect(state).toEqual({ all: [], current: null, isLoading: false });
    });

    it('should add update new current room', () => {
        const state = reducer(undefined, newCurrentRoom({ name: 'Test' }));
        expect(state).toEqual({
            all: [],
            current: { name: 'Test' },
            isLoading: false,
        });
    });

    it('should update the new rooms', () => {
        const state = reducer(undefined, newRooms([{ name: 'Test' }]));
        expect(state).toEqual({
            all: [{ name: 'Test' }],
            current: null,
            isLoading: false,
        });
    });

    it('should fetch the rooms', () => {
        const store = mockStore({
            user: {
                token: 'jwt',
                email: 'test@test.test',
                username: 'TestTest',
                _id: 'test',
            },
        });
        const expectedActions = [
            { type: LOADING_ROOMS },
            {
                type: NEW_ROOMS,
                payload: [{ owner: { username: 'user1' } }],
            },
        ];

        axios.mockImplementationOnce(() =>
            Promise.resolve({
                data: {
                    rooms: [{ owner: { username: 'user1' } }],
                },
            })
        );

        return store.dispatch(getRooms()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
