import './style.scss';
import Input from './Input';
import { useReducer } from 'react';
import { initialState, reducer } from './reducer';

const makeAction = (type, payload) => ({
    type,
    payload,
});

const dispatchByInputName = (inputName, dispatch, event) =>
    ({
        email: dispatch(makeAction('NEW_EMAIL', event.target.value)),
        username: dispatch(makeAction('NEW_USERNAME', event.target.value)),
        password: dispatch(makeAction('NEW_PASSWORD', event.target.value)),
        confPass: dispatch(makeAction('NEW_CONF_PASS', event.target.value)),
    }[inputName]);

function Login() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const onChange = (inputName) => (event) => {
        dispatchByInputName(inputName, dispatch, event);
    };

    return (
        <div className="page">
            <header>
                <h1>Bienvenue</h1>
            </header>
            <h2>Inscription</h2>

            <form className={'form'} action="">
                <Input
                    label={'Email'}
                    name={'email'}
                    type={'email'}
                    value={state.email}
                    onChange={onChange}
                />
            </form>
        </div>
    );
}

export default Login;
