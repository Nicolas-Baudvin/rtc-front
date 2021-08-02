import { mount, shallow } from 'enzyme';
import Login from './index';
import Input from './Input';
import { BrowserRouter as Router } from 'react-router-dom';

describe("<Login page='signup' /> component", () => {
    const wrapper = mount(
        <Router>
            <Login page={'signup'} />
        </Router>
    );
    it('should render', () => {
        expect(wrapper).toBeTruthy();
    });

    it('should contain 4 inputs', () => {
        expect(wrapper.find(Input).length).toEqual(4);
    });

    it('should write in 1 input', () => {
        const expectedValue = 'Test';
        const input = wrapper.find('input').first();
        const lastInput = wrapper.find('input').last();
        input.simulate('change', { target: { value: expectedValue } });
        const value = wrapper.find('input').first().props().value;
        expect(value).toEqual(expectedValue);
        expect(lastInput.props().value).toEqual('');
    });
});

describe("<Login page='login' component />", () => {
    const wrapper = mount(
        <Router>
            <Login page={'login'} />
        </Router>
    );

    it('should render', () => {
        expect(wrapper).toBeTruthy();
    });

    it('should contain 2 inputs', () => {
        expect(wrapper.find(Input).length).toEqual(2);
    });

    it('should write in one input', () => {
        const expectedValue = 'Test';
        const input = wrapper.find('input').first();
        const lastInput = wrapper.find('input').last();
        input.simulate('change', { target: { value: expectedValue } });
        const value = wrapper.find('input').first().props().value;
        expect(value).toEqual(expectedValue);
        expect(lastInput.props().value).toEqual('');
    });
});
