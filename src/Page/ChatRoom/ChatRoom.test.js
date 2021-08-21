import { mount } from 'enzyme';
import ChatRoom from './index';
import { useSelector as useSelectorMock } from 'react-redux';
import CreateChat from '../CreateChat';

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

describe('ChatRoom test', () => {
    let wrapper;

    beforeEach(() => {
        useSelectorMock.mockImplementation(() => ({
            token: 'jwt',
            username: 'TestTest',
        }));
        wrapper = mount(<CreateChat />);
    });
    it('should render', () => {
        expect(wrapper).toBeTruthy();
    });
});
