import { mount } from 'enzyme';
import MyRooms from '.';
import { useSelector as useSelectorMock } from 'react-redux';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch,
}));

const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    }),
}));

describe('MyRooms component', () => {
    let wrapper;
    beforeEach(() => {
        useSelectorMock.mockImplementation(() => ({
            token: 'jwt',
            email: 'test@test.test',
            username: 'TestTest',
            picture: '',
            isLoading: false,
            all: [
                { owner: { name: 'room1', username: 'user1' } },
                { owner: { name: 'room2', username: 'user2' } },
            ],
        }));
        wrapper = mount(<MyRooms />);
    });
    it('should render', () => {
        expect(wrapper).toBeTruthy();
    });

    it('should have 2 rooms', () => {
        const rooms = wrapper.find('.roomsList-list__item');
        expect(rooms.length).toEqual(2);
    });
});
