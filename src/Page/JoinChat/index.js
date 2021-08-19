import Header from '../../Components/Header';
import { useReducer } from 'react';
import { initialState, reducer } from '../CreateChat/reducer';
import { dispatchByInputName } from '../CreateChat/reducer';
import Form from '../../Components/Form';
import { useSelector } from 'react-redux';

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
    const [state, dispatch] = useReducer(reducer, initialState);
    const { isLoading } = useSelector((state) => state.user);

    const onSubmit = (e) => {
        e.preventDefault();
    };

    const onChange = (e, inputName) => {
        dispatchByInputName(inputName, dispatch)(e);
    };

    return (
        <div className={'join'}>
            <Header page={'Rejoindre un salon'} />
            <Form
                inputs={inputs}
                onChange={onChange}
                state={state}
                onSubmit={onSubmit}
                errors={state}
                isLoading={isLoading}
            />
        </div>
    );
}

export default JoinChat;
