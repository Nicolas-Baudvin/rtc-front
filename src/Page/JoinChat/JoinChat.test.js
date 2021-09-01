import { mount } from 'enzyme';
import JoinChat from './index';
import { useSelector as useSelectorMock } from 'react-redux';
import { newMessage } from '../../Store/Message/actions';

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

describe('<JoinChat />', () => {
    const expectedRoomName = 'Test';
    const expectedRoomPass = 'TestTest';
    let wrapper;
    beforeEach(() => {
        useSelectorMock.mockImplementation(() => ({
            isLoading: false,
            current: null,
        }));
        wrapper = mount(<JoinChat />);
    });
    it('should render', () => {
        const wrapper = mount(<JoinChat />);
        expect(wrapper).toBeTruthy();
    });

    it('should write in 2 inputs', () => {
        wrapper
            .find('input')
            .first()
            .simulate('change', { target: { value: expectedRoomName } });
        wrapper
            .find('input')
            .last()
            .simulate('change', { target: { value: expectedRoomPass } });

        expect(wrapper.find('input').first().props().value).toEqual(
            expectedRoomName
        );
        expect(wrapper.find('input').last().props().value).toEqual(
            expectedRoomPass
        );
    });

    it('should call dispatch on submit', () => {
        wrapper
            .find('input')
            .first()
            .simulate('change', { target: { value: expectedRoomName } });
        wrapper
            .find('input')
            .last()
            .simulate('change', { target: { value: expectedRoomPass } });
        wrapper.find('form').simulate('submit');
        expect(mockDispatch).toHaveBeenCalled();
    });

    it('should call history push if current room is available', () => {
        useSelectorMock.mockImplementation(() => ({
            isLoading: false,
            current: { name: 'Test' },
        }));
        wrapper = mount(<JoinChat />);
        expect(mockHistoryPush).toHaveBeenCalled();
    });
});
