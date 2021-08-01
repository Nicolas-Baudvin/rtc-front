import { mount, shallow } from 'enzyme';
import Login from './index';

describe('Login component', () => {
    const wrapper = mount(<Login />);
    it('should render', () => {
        expect(wrapper).toBeTruthy();
    });

    it('should write in input', () => {
        const testEventValue = 'Test';
        const input = wrapper.find('input').first();
        input.simulate('change', { target: { value: testEventValue } });
        const value = wrapper.find('input').first().props().value;
        expect(value).toEqual(testEventValue);
    });
});
