import { AiOutlineUser } from 'react-icons/ai';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import cx from 'classnames';

function ChatMessage({ message }) {
    const { username } = useSelector((state) => state.user);
    return (
        <div
            className={cx('chat-message', {
                'chat-message-right': username === message.author,
            })}
        >
            {username === message.author && (
                <div className={'chat-message-desc'}>
                    <p className={'chat-message-text'}>{message.desc}</p>
                </div>
            )}
            <div className={'chat-message-user'}>
                <div className={'chat-message-user-picture'}>
                    {Boolean(message.authorPicture) ? (
                        <img src={message.authorPicture} alt={'user image'} />
                    ) : (
                        <AiOutlineUser />
                    )}
                </div>
                <div className={'chat-message-user-username'}>
                    {message.author}
                </div>
            </div>
            {username !== message.author && (
                <div className={'chat-message-desc'}>
                    <p className={'chat-message-text'}>{message.desc}</p>
                </div>
            )}
        </div>
    );
}

ChatMessage.propTypes = {
    message: PropTypes.shape({
        desc: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        authorPicture: PropTypes.string,
        date: PropTypes.string,
    }),
};

export default ChatMessage;
