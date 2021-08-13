import { useSelector as useSelectorMock } from 'react-redux';
import { mount } from 'enzyme';
import { logout } from '../../Store/UserData/actions';
import Header from './index';

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

describe('Header Comp', () => {
    let wrapper;
    const expectedUsername = 'TestTest';
    const page = 'dashboard';
    beforeEach(() => {
        useSelectorMock.mockImplementation(() => ({
            token: 'jwt',
            username: expectedUsername,
        }));
        wrapper = mount(<Header page={page} />);
    });

    it('should render', () => {
        expect(wrapper).toBeTruthy();
    });

    it('should have prop page text as h1 text', () => {
        expect(wrapper.find('h1').text()).toEqual(page);
    });

    it("should redirect to 'mon compte' page", () => {
        wrapper.find('.header-user').simulate('click');
        expect(mockHistoryPush).toHaveBeenCalledWith('/mon-compte');
    });

    it('should call dispatch to logout the user when clicking on disconnect button', () => {
        wrapper.find('.header-buttons').find('button').simulate('click');
        expect(mockDispatch).toHaveBeenCalledWith(logout());
    });

    it('should display username', () => {
        const username = wrapper.find('.header-user__username').text();
        expect(username).toEqual(expectedUsername);
    });

    it('should hide menu button when user is on Dashboard page', () => {
        const buttons = wrapper.find('.header-buttons').find('button');
        expect(buttons.length).toEqual(1);
    });

    it('should display the menu button when user is on another page', () => {
        wrapper = mount(<Header page={'otherPage'} />);
        const buttons = wrapper.find('.header-buttons').find('button');
        expect(buttons.length).toEqual(2);
    });

    it('should redirect to dashboard page', () => {
        wrapper = mount(<Header page={'otherPage'} />);
        const button = wrapper.find('.header-buttons').find('button').last();
        button.simulate('click');
        expect(mockHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
});
