import { mount } from 'enzyme/build';
import { useSelector as useSelectorMock } from 'react-redux';
import ChatMessage from '.';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
}));

const message = {
    desc: 'Message Desc',
    author: 'Message Author',
    authorPicture: 'Message Author Picture',
    data: '21/25/56',
};

describe('<ChatMessage />', () => {
    let wrapper;
    const expectedUsername = 'TestTest';
    beforeEach(() => {
        useSelectorMock.mockImplementation(() => ({
            username: expectedUsername,
        }));
        wrapper = mount(<ChatMessage message={message} />);
    });

    it('should render', () => {
        expect(wrapper).toBeTruthy();
    });

    it('should display the message desc', () => {
        const desc = wrapper.find('.chat-message-text').text();
        expect(desc).toEqual(message.desc);
    });

    it('should display the message author', () => {
        const desc = wrapper.find('.chat-message-user-username').text();
        expect(desc).toEqual(message.author);
    });
});
