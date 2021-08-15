import { mount } from 'enzyme';
import CreateChat from './index';
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

describe('CreateChat Component', () => {
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

    it('should redirect to dashboard', () => {
        wrapper.find('.button-border').simulate('click');
        expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard');
    });

    it('should write in input', () => {
        const expectedValue = 'test';
        wrapper
            .find('input')
            .first()
            .simulate('change', { target: { value: expectedValue } });
        expect(wrapper.find('input').first().props().value).toEqual(
            expectedValue
        );
    });
});
