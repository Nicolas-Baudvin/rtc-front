import { mount } from 'enzyme';
import MyAccount from './index';
import { useSelector as useSelectorMock } from 'react-redux';
import Dashboard from '../Dashboard';

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

describe('My Account Component', () => {
    let wrapper;
    beforeEach(() => {
        useSelectorMock.mockImplementation(() => ({
            token: 'jwt',
            email: 'test@test.test',
            username: 'TestTest',
            picture: '',
        }));
        wrapper = mount(<MyAccount />);
    });

    it('should render', () => {
        expect(wrapper).toBeTruthy();
    });

    it('should write in an input', () => {
        const expectedValue = 'test';
        wrapper
            .find('input')
            .first()
            .simulate('change', { target: { value: expectedValue } });
        const value = wrapper.find('input').first().props().value;
        expect(value).toEqual(expectedValue);
    });

    it('should call dispatch on user data form submit', () => {
        wrapper.find('form').first().simulate('submit');
        expect(mockDispatch).toHaveBeenCalled();
    });

    it('should call dispatch on pass form submit', () => {
        const inputs = wrapper.find('form').last().find('input');
        inputs.forEach((input) => {
            input.simulate('change', { target: { value: 'Test-Test' } });
        });
        wrapper.find('form').last().simulate('submit');

        expect(mockDispatch).toHaveBeenCalled();
    });

    it('should not call dispatch on pass form submit because of errors', () => {
        wrapper.find('form').last().simulate('submit');
        expect(mockDispatch).toHaveBeenCalledTimes(0);
    });

    it('should redirect if browser does not have a token in storage', () => {
        useSelectorMock.mockImplementation(() => ({
            token: '',
            email: 'test@test.test',
            username: 'TestTest',
            picture: '',
        }));
        wrapper = mount(<MyAccount />);
        expect(mockHistoryPush).toHaveBeenCalledWith('/');
    });
});
