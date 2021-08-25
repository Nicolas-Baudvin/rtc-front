import Textarea from '../Textarea';
import { IoSendSharp } from 'react-icons/io5';
import { useState } from 'react';
import { sendMessage } from '../../Store/Rooms/actions';
import { useDispatch } from 'react-redux';

function ChatForm() {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();

    const onChange = (e) => {
        if (e.target.value.length >= 2000) {
            return;
        }
        return setValue(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (value.length >= 2000) {
            // TODO: errors
            return;
        }
        setValue('');
        return dispatch(sendMessage(value));
    };

    return (
        <form onSubmit={onSubmit} action="">
            <Textarea onChange={onChange} value={value} />
            <button type={'submit'}>
                <IoSendSharp />
            </button>
        </form>
    );
}

export default ChatForm;
