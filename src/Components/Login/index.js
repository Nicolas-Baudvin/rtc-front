import './style.scss';
import cx from 'classnames';
import Input from './Input';
import { useReducer } from 'react';
import { initialState, reducer } from './reducer';
import { checkFields, dispatchByInputName, inputs } from './util';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, fetchUserData } from '../../Store/UserData/actions';
import { AiOutlineLoading3Quarters } from 'react-icons/all';

function Login({ page = 'signup' }) {
    const [state, localDispatch] = useReducer(reducer, initialState);
    const { isLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const onChange = (inputName) => (event) => {
        dispatchByInputName(inputName, localDispatch, event)();
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const errors = checkFields(state);

        if (page === 'submit' && Object.keys(errors).length) {
            return localDispatch({
                type: 'NEW_ERRORS',
                payload: { ...errors },
            });
        }

        return page === 'signup'
            ? dispatch(createUser(state))
            : dispatch(fetchUserData({ ...state, page }));
    };

    return (
        <div className="page">
            <header>
                <h1>Bienvenue</h1>
            </header>
            <h2>Inscription</h2>

            <form onSubmit={onSubmit} className={'form'} action="">
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
                        errors={state.errors}
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

                {page === 'signup' && (
                    <button
                        className={cx('page-button', {
                            'page-loading': isLoading,
                        })}
                        type="submit"
                    >
                        {isLoading ? (
                            <AiOutlineLoading3Quarters />
                        ) : (
                            "S'inscrire"
                        )}
                    </button>
                )}
                {page === 'login' && (
                    <button
                        className={cx('page-button', {
                            'page-loading': isLoading,
                        })}
                        type="submit"
                    >
                        {isLoading ? (
                            <AiOutlineLoading3Quarters />
                        ) : (
                            'Connexion'
                        )}
                    </button>
                )}
            </form>
        </div>
    );
}

Login.propTypes = {
    page: PropTypes.string.isRequired,
};

export default Login;
