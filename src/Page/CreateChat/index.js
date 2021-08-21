import Header from '../../Components/Header';
import './style.scss';
import Form from '../../Components/Form';
import { useReducer } from 'react';
import {
    dispatchByInputName,
    initialState,
    makeAction,
    reducer,
} from './reducer';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RoomValidation } from '../../Utils/';
import { createRoom } from '../../Store/Rooms/actions';

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

function CreateChat() {
    const [state, localDispatch] = useReducer(reducer, initialState);
    const history = useHistory();
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        const errors = new RoomValidation(state).getErrors();
        if (Object.keys(errors).length) {
            return localDispatch(makeAction('NEW_ERRORS', errors));
        }
        return dispatch(
            createRoom({ roomName: state.roomName, roomPass: state.roomPass })
        );
    };

    const onClickBack = () => history.push('/dashboard');

    const onChange = (e, inputName) => {
        dispatchByInputName(inputName, localDispatch)(e);
    };

    return (
        <div className={'create'}>
            <Header page={'Créer un salon'} />
            <Form
                onSubmit={onSubmit}
                onChange={onChange}
                inputs={inputs}
                state={state}
                isLoading={false}
                errors={state.errors}
            />
            <p> ou </p>
            <button onClick={onClickBack} className={'button button-border'}>
                Retour
            </button>
        </div>
    );
}

export default CreateChat;
