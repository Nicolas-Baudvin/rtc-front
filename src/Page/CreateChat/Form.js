import Input from '../../Components/Input';
import { useHistory } from 'react-router-dom';
import { useReducer } from 'react';
import { initialState, reducer } from './reducer';

const makeAction = (type, payload) => ({
    type,
    payload,
});

const dispatchByInputName = (inputName, dispatch) =>
    ({
        roomName: (e) => dispatch(makeAction('NEW_ROOM_NAME', e.target.value)),
        roomPass: (e) => dispatch(makeAction('NEW_ROOM_PASS', e.target.value)),
    }[inputName]);

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

function Form({ onSubmit }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const history = useHistory();

    const onClickBack = () => history.push('/dashboard');

    const onChange = (e, inputName) => {
        dispatchByInputName(inputName, dispatch)(e);
    };

    return (
        <form onSubmit={onSubmit} action="">
            {inputs.map((input, i) => (
                <Input
                    key={i}
                    inputProps={{
                        name: input.inputProps.name,
                        info: input.inputProps.info,
                        type: input.inputProps.type,
                        onChange: (e) => onChange(e, input.inputProps.name),
                        value: state[input.inputProps.name],
                    }}
                    labelTitle={input.labelTitle}
                    labelProps={{ htmlFor: input.labelProps.htmlFor }}
                />
            ))}
            <button className={'button'}> Créer </button>
            <p> ou </p>
            <button onClick={onClickBack} className={'button button-border'}>
                Retour
            </button>
        </form>
    );
}

export default Form;
