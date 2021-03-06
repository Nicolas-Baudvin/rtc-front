import { mount, shallow } from 'enzyme';
import Login from './index';
import Input from './Input';
import { BrowserRouter as Router } from 'react-router-dom';
import { useSelector as useSelectorMock } from 'react-redux';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch,
}));

describe("<Login page='signup' /> component", () => {
    beforeEach(() => {
        useSelectorMock.mockImplementation(() => ({
            isLoading: false,
        }));
    });

    it('should render', () => {
        const wrapper = mount(
            <Router>
                <Login page={'signup'} />
            </Router>
        );
        expect(wrapper).toBeTruthy();
    });

    it('should contain 4 inputs', () => {
        const wrapper = mount(
            <Router>
                <Login page={'signup'} />
            </Router>
        );
        expect(wrapper.find('input').length).toEqual(4);
    });

    it('should write in 1 input', () => {
        const wrapper = mount(
            <Router>
                <Login page={'signup'} />
            </Router>
        );
        const expectedValue = 'Test';
        const input = wrapper.find('input').first();
        const lastInput = wrapper.find('input').last();
        input.simulate('change', { target: { value: expectedValue } });
        const value = wrapper.find('input').first().props().value;
        expect(value).toEqual(expectedValue);
        expect(lastInput.props().value).toEqual('');
    });

    it('should call mockDispatch on submit', () => {
        const wrapper = mount(
            <Router>
                <Login page={'signup'} />
            </Router>
        );
        const inputs = wrapper.find('input');
        inputs.forEach((input) => {
            if (input.props().name === 'email') {
                input.simulate('change', { target: { value: 'test@test.fr' } });
            } else {
                input.simulate('change', { target: { value: 'TestTest' } });
            }
        });
        const form = wrapper.find('.form');
        form.simulate('submit');
        expect(mockDispatch).toHaveBeenCalled();
    });
});

describe("<Login page='login' component />", () => {
    useSelectorMock.mockImplementation(() => ({
        isLoading: false,
    }));
    const wrapper = mount(
        <Router>
            <Login page={'login'} />
        </Router>
    );

    it('should render', () => {
        expect(wrapper).toBeTruthy();
    });

    it('should contain 2 inputs', () => {
        expect(wrapper.find('input').length).toEqual(2);
    });
});
