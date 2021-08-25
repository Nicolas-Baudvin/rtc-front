import Header from '../../Components/Header';
import './style.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { joinRoom, sendMessage } from '../../Store/Rooms/actions';
import ChatMessage from '../../Components/ChatMessage';
import ChatForm from '../../Components/ChatForm';

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
                <div className={'chat-messages'}>
                    {current && current.messages.length > 0 ? (
                        current.messages.map((message, i) => (
                            <ChatMessage key={i} message={message} />
                        ))
                    ) : (
                        <p className={'chat-message-empty'}>
                            Ce chat n'a pas encore de messages, qu'attendez vous
                            ?
                        </p>
                    )}
                </div>
                <ChatForm />
            </div>
        </div>
    );
}

export default ChatRoom;
