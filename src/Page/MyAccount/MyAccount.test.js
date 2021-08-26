import { mount } from 'enzyme';
import MyAccount from './index';
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

describe('My Account Component', () => {
    let wrapper;
    beforeEach(() => {
        useSelectorMock.mockImplementation(() => ({
            token: 'jwt',
            email: 'test@test.test',
            username: 'TestTest',
            picture: '',
            isLoading: false,
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

    it('should call dispatch on form submit', () => {
        const inputs = wrapper.find('form').first().find('input');
        inputs.forEach((input) => {
            if (input.props().type === 'email') {
                input.simulate('change', { target: { value: 'test@test.fr' } });
            } else {
                input.simulate('change', { target: { value: 'Test-Test' } });
            }
        });
        wrapper.find('form').first().simulate('submit');
        expect(mockDispatch).toHaveBeenCalled();
    });

    it('should not call dispatch on form submit because of errors', () => {
        const inputs = wrapper.find('form').first().find('input');
        inputs.forEach((input) => {
            if (input.props().type === 'email')
                input.simulate('change', { target: { value: 'test' } });
        });
        wrapper.find('form').first().simulate('submit');
        expect(mockDispatch).toHaveBeenCalledTimes(0);
    });

    it('should redirect if browser does not have a token in storage', () => {
        useSelectorMock.mockImplementation(() => ({
            token: '',
            email: 'test@test.test',
            username: 'TestTest',
            picture: '',
            isLoading: false,
        }));
        wrapper = mount(<MyAccount />);
        expect(mockHistoryPush).toHaveBeenCalledWith('/');
    });
});
