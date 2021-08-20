import reducer from './reducer';

describe('Room Redux Store', () => {
    it('should return the initial state', () => {
        const state = reducer(undefined, {});
        expect(state).toEqual({ all: [], current: null, isLoading: false });
    });
});
