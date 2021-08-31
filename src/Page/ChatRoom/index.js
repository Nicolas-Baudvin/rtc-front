import Header from '../../Components/Header';
import './style.scss';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { joinRoom } from '../../Store/Rooms/actions';
import ChatForm from '../../Components/ChatForm';
import ChatMessages from './Messages';

function ChatRoom() {
    const { current } = useSelector((state) => state.rooms);
    const { name, _id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            joinRoom({
                room: {
                    name,
                    _id,
                },
            })
        );
    }, []);

    return (
        <div className={`chat`}>
            <Header page={`Chat ${name}`} />
            <div className={'chat-container'}>
                <ChatMessages current={current} />
                <ChatForm />
            </div>
        </div>
    );
}

export default ChatRoom;
