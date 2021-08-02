import './style.scss';
import Input from './Input';
import { useReducer } from 'react';
import { initialState, reducer } from './reducer';
import { dispatchByInputName, inputs } from './util';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Login({ page = 'signup' }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const onChange = (inputName) => (event) => {
        dispatchByInputName(inputName, dispatch, event)();
    };

    return (
        <div className="page">
            <header>
                <h1>Bienvenue</h1>
            </header>
            <h2>Inscription</h2>

            <form className={'form'} action="">
                {inputs(page).map((input, i) => (
                    <Input
                        key={i}
                        label={input.label}
                        name={input.name}
                        type={input.type}
                        value={state[input.name]}
                        onChange={onChange(input.name)}
                        info={input.info}
                        page={page}
                    />
                ))}

                {page === 'signup' && (
                    <Link to={'/connexion'}>Tu as déjà un compte ?</Link>
                )}
                {page === 'login' && (
                    <Link to="/oublie-mot-de-passe">Mot de passe oublié ?</Link>
                )}
                {page === 'login' && (
                    <Link to="/inscription">Tu n'as pas de compte ?</Link>
                )}
                <button type="submit">S'inscrire</button>
            </form>
        </div>
    );
}

Login.propTypes = {
    page: PropTypes.string.isRequired,
};

export default Login;
