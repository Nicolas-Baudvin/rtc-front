import ChatMessage from '../../Components/ChatMessage';
import PropTypes from 'prop-types';

function ChatMessages({ current }) {
    return (
        <div className={'chat-messages'}>
            {current && current.messages.length > 0 ? (
                current.messages.map((message, i) => (
                    <ChatMessage key={i} message={message} />
                ))
            ) : (
                <p className={'chat-message-empty'}>
                    Ce chat n'a pas encore de messages, qu'attendez vous ?
                </p>
            )}
        </div>
    );
}

ChatMessages.propTypes = {
    current: PropTypes.shape({
        name: PropTypes.string.isRequired,
        messages: PropTypes.array,
        owner: PropTypes.shape({
            email: PropTypes.string.isRequired,
            username: PropTypes.string.isRequired,
            _id: PropTypes.string.isRequired,
        }),
        members: PropTypes.arrayOf(
            PropTypes.shape({
                email: PropTypes.string.isRequired,
                username: PropTypes.string.isRequired,
                socketID: PropTypes.string.isRequired,
                _id: PropTypes.string.isRequired,
            })
        ),
        _id: PropTypes.string.isRequired,
    }),
};

export default ChatMessages;
