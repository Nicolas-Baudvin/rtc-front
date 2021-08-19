import './style.scss';
import cx from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { MdClear } from 'react-icons/md';
import { clearMessage } from '../../Store/Message/actions';
import { motion } from 'framer-motion';

const variants = {
    show: { opacity: 1, display: 'flex' },
    hide: { opacity: 0, transitionEnd: { display: 'none' } },
};

function Message() {
    const dispatch = useDispatch();
    const { message, isError, isShow } = useSelector((state) => state.popup);

    const onClick = () => dispatch(clearMessage());

    return (
        <motion.div
            variants={variants}
            animate={isShow ? 'show' : 'hide'}
            className={cx('message', { 'message-error': isError })}
        >
            <p
                className={cx('message-text', {
                    'message-text-error': isError,
                })}
            >
                {message.toString()}
            </p>
            <div className={'message-buttons'}>
                <button
                    onClick={onClick}
                    className={'message-buttons__item--clear'}
                >
                    <MdClear />
                </button>
            </div>
        </motion.div>
    );
}

export default Message;
