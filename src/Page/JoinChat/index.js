/* eslint-disable react-hooks/exhaustive-deps */
import Header from '../../Components/Header';
import { useEffect, useReducer } from 'react';
import {
    initialState,
    reducer,
    dispatchByInputName,
} from '../CreateChat/reducer';
import Form from '../../Components/Form';
import { useDispatch, useSelector } from 'react-redux';
import { joinRoom } from '../../Store/Rooms/actions';
import { makeAction } from '../Login/util';
import { useHistory } from 'react-router-dom';

const inputs = [
    {
        inputProps: {
            name: 'roomName',
            type: 'text',
            info: 'Le nom du salon ne doit pas contenir de caractères spéciaux et dois faire entre 3 et 40 caractères',
        },
        labelProps: {
            htmlFor: 'roomName',
        },
        labelTitle: 'Nom du salon',
    },
    {
        inputProps: {
            name: 'roomPass',
            type: 'password',
            info: 'Le mot de passe du salon doit faire moins de 30 caractères (mot de passe complexe conseillé avec caractères spéciaux)',
        },
        labelProps: {
            htmlFor: 'roomPass',
        },
        labelTitle: 'Mot de passe du salon',
    },
];

function JoinChat() {
    const [state, localDispatch] = useReducer(reducer, initialState);
    const { isLoading } = useSelector((state) => state.user);
    const { current } = useSelector((state) => state.rooms);
    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault();
        const { roomName, roomPass } = state;
        if (!roomName || !roomPass) {
            // TODO: error
            return;
        }
        dispatch(
            joinRoom({
                room: {
                    name: roomName,
                    password: roomPass,
                },
            })
        );
        localDispatch(makeAction('CLEAR_FIELDS'));
    };

    const onChange = (e, inputName) => {
        dispatchByInputName(inputName, localDispatch)(e);
    };

    useEffect(() => {
        if (current) {
            history.push(`/salons/${current.name}/${current._id}`);
        }
    }, [current]);

    return (
        <div className={'join'}>
            <Header page={'Rejoindre un salon'} />
            <Form
                inputs={inputs}
                onChange={onChange}
                state={state}
                onSubmit={onSubmit}
                errors={state.errors}
                isLoading={isLoading}
            />
        </div>
    );
}

export default JoinChat;
