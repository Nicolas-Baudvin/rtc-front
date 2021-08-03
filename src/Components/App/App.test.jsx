import { shallow } from 'enzyme';
import App from './index';
import Login from '../Login';
import { useSelector as useSelectorMock } from 'react-redux';

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    useDispatch: () => mockDispatch,
}));

describe('<App />', () => {
    useSelectorMock.mockImplementation(() => ({
        token: '',
    }));
    const wrapper = shallow(<App />);

    it('should render', () => {
        expect(wrapper).toBeTruthy();
    });

    it('should contain Login component', () => {
        expect(wrapper.contains(<Login page={'signup'} />)).toEqual(true);
        expect(wrapper.contains(<Login page={'login'} />)).toEqual(true);
    });
});
