import { mount, shallow } from 'enzyme';
import Input from './index';

describe('<Input />', () => {
    const wrapper = mount(<Input />);
    it('should render', () => {
        expect(wrapper).toBeTruthy();
    });

    it('should animate the label on focus', () => {
        const input = wrapper.find('input').first();
        input.simulate('focus');
        const classname = wrapper.find('label').first().props().className;
        expect(classname).toEqual('label-selected');
    });
});
