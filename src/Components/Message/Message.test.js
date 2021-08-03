import { shallow } from 'enzyme';
import Message from './index';
import { useSelector as useSelectorMock } from 'react-redux';
import { clearMessage } from '../../Store/Message/actions';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch,
}));

describe('Message Component', () => {
    it('should render', () => {
        useSelectorMock.mockImplementation(() => ({
            isError: false,
            message: '',
            isShow: true,
        }));
        const wrapper = shallow(<Message />);
        expect(wrapper).toBeTruthy();
    });
    it('should display a message', () => {
        const expectedMessage = 'expectedMessage';
        useSelectorMock.mockImplementation(() => ({
            isError: false,
            message: expectedMessage,
            isShow: true,
        }));
        const wrapper = shallow(<Message />);
        expect(wrapper.find('.message-text').text()).toEqual(expectedMessage);
    });

    it('should display an error', () => {
        const expectedMessage = 'expectedMessage';
        useSelectorMock.mockImplementation(() => ({
            isError: true,
            message: expectedMessage,
            isShow: true,
        }));
        const wrapper = shallow(<Message />);
        const message = wrapper.find('.message-text');
        expect(message.text()).toEqual(expectedMessage);
        expect(message.props().className).toEqual('message-text message-error');
    });

    it('should call dispatch on click on clear button', () => {
        const expectedMessage = 'expectedMessage';
        useSelectorMock.mockImplementation(() => ({
            isError: true,
            message: expectedMessage,
            isShow: true,
        }));
        const wrapper = shallow(<Message />);
        const button = wrapper.find('.message-buttons__item--clear');
        button.simulate('click');
        expect(mockDispatch).toHaveBeenCalledWith(clearMessage());
    });
});
