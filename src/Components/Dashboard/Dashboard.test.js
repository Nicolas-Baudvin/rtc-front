import { mount } from 'enzyme';
import Dashboard from './index';
import { useSelector as useSelectorMock } from 'react-redux';
import { logout } from '../../Store/UserData/actions';
import { menuItems } from './util';

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
        location: { pathname: 'connexion' },
    }),
}));

describe('Dashboard', () => {
    let wrapper;
    beforeEach(() => {
        useSelectorMock.mockImplementation(() => ({
            token: 'jwt',
        }));
        wrapper = mount(<Dashboard />);
    });

    it('should render', () => {
        expect(wrapper).toBeTruthy();
    });

    it("should redirect to 'mon compte' page", () => {
        wrapper.find('.dashboard-header-user').simulate('click');
        expect(mockHistoryPush).toHaveBeenCalledWith('/mon-compte');
    });

    it('should call dispatch to logout the user when clicking on disconnect button', () => {
        wrapper
            .find('.dashboard-header-buttons')
            .find('button')
            .simulate('click');
        expect(mockDispatch).toHaveBeenCalledWith(logout());
    });

    it('should redirect the user if he is not connected', () => {
        useSelectorMock.mockImplementation(() => ({
            token: '',
        }));
        wrapper = mount(<Dashboard />);
        expect(mockHistoryPush).toHaveBeenCalledWith('/connexion');
    });

    it('should have same length as menuItems array', () => {
        const buttons = wrapper.find('.dashboard-menu__item');
        expect(buttons.length).toEqual(menuItems.length);
    });

    it('should call mockHistory at each menu items click', () => {
        const buttons = wrapper.find('.dashboard-menu__item');
        buttons.forEach((button, i) => {
            button.simulate('click');
            if (menuItems[i].path === 'disconnect') {
                expect(mockHistoryPush).toHaveBeenCalledWith('/');
                expect(mockDispatch).toHaveBeenCalledWith(logout());
            } else {
                expect(mockHistoryPush).toHaveBeenCalledWith(menuItems[i].path);
            }
        });
    });
});
