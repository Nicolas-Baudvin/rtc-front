import Header from '../../Components/Header';
import './style.scss';
import Form from '../../Components/Form';
import { useReducer } from 'react';
import { dispatchByInputName, initialState, reducer } from './reducer';
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

function CreateChat() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();

    const onSubmit = (e) => {
        e.preventDefault();
    };

    const onClickBack = () => history.push('/dashboard');

    const onChange = (e, inputName) => {
        dispatchByInputName(inputName, dispatch)(e);
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
                errors={{}}
            />
            <p> ou </p>
            <button onClick={onClickBack} className={'button button-border'}>
                Retour
            </button>
        </div>
    );
}

export default CreateChat;
