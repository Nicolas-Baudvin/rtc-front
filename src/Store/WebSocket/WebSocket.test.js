import reducer from './reducer';
import { clearSocket, newSocket } from './actions';

describe('WebSocket Store', () => {
    it('should return initial state', () => {
        const state = reducer(undefined, {});
        expect(state).toEqual({ socket: null });
    });

    it('should return the state updated with new socket', () => {
        const newState = reducer(undefined, newSocket('test'));
        expect(newState).toEqual({ socket: 'test' });
    });

    it('should clear the socket', () => {
        const newState = reducer(undefined, clearSocket());
        expect(newState).toEqual({ socket: null });
    });
});
