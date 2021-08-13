import Input from '../../Reusable/Input';
import { useHistory } from 'react-router-dom';
import { useReducer } from 'react';
import { initialState, reducer } from './reducer';

function Form() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();

    const onClickBack = () => history.push('/dashboard');

    const onChange = (e) => {};

    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={onSubmit} action="">
            <Input
                inputProps={{
                    name: 'chatName',
                    info: 'Le nom du salon ne doit pas contenir de caractères spéciaux et dois faire entre 3 et 40 caractères',
                    type: 'text',
                }}
                labelTitle={'Nom du salon'}
                labelProps={{ htmlFor: 'chatName' }}
            />
            <Input
                inputProps={{
                    name: 'chatPassword',
                    info: 'Le mot de passe du salon doit faire moins de 30 caractères (mot de passe complexe conseillé avec caractères spéciaux)',
                    type: 'password',
                }}
                labelTitle={'Mot de passe du salon'}
                labelProps={{ htmlFor: 'chatPassword' }}
            />

            <button className={'button'}> Créer </button>
            <p> ou </p>
            <button onClick={onClickBack} className={'button button-border'}>
                Retour
            </button>
        </form>
    );
}

export default Form;
