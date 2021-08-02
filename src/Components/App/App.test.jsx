import { shallow } from 'enzyme';
import App from './index';
import Login from '../Login';

describe('<App />', () => {
    const wrapper = shallow(<App />);
    it('should render', () => {
        expect(wrapper).toBeTruthy();
    });

    it('should contain Login component', () => {
        expect(wrapper.contains(<Login page={'signup'} />)).toEqual(true);
        expect(wrapper.contains(<Login page={'login'} />)).toEqual(true);
    });
});
