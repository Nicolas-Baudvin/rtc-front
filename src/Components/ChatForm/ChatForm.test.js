import { mount } from "enzyme/build";
import ChatForm from ".";

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => mockDispatch,
}));

describe('<ChatForm />', () => {
    const expectedValue = 'Test';
    const wrapper = mount(<ChatForm />);

    it('should render', () => {
        expect(wrapper).toBeTruthy();
    });

    it('should write in textarea', () => {
        wrapper.find('textarea').simulate('change', { target: { value: expectedValue}});
        expect(wrapper.find('textarea').props().value).toEqual(expectedValue);
    });

    it('should call dispatch on form submit', () => {
        wrapper.find('textarea').simulate('change', { target: { value: expectedValue}});
        wrapper.find('form').simulate('submit');
        expect(mockDispatch).toHaveBeenCalled();
    });
});