import './style.scss';
import { useReducer } from 'react';
import { initialState, reducer } from './reducer';
import {
    checkFields,
    dispatchByInputName,
    loginInputs,
    signupInputs,
} from './util';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, fetchUserData } from '../../Store/UserData/actions';
import Links from './Links';
import Form from '../../Components/Form';

function Login({ page = 'signup' }) {
    const [state, localDispatch] = useReducer(reducer, initialState);
    const { isLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const onChange = (event, inputName) => {
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
            <h2>{page === 'signup' ? 'Insciption' : 'Connexion'}</h2>

            {page === 'signup' ? (
                <Form
                    inputs={signupInputs}
                    onChange={onChange}
                    state={state}
                    onSubmit={onSubmit}
                    errors={state.errors}
                    isLoading={isLoading}
                />
            ) : (
                <Form
                    inputs={loginInputs}
                    onChange={onChange}
                    state={state}
                    onSubmit={onSubmit}
                    errors={state.errors}
                    isLoading={isLoading}
                />
            )}
            <Links page={page} />
        </div>
    );
}

Login.propTypes = {
    page: PropTypes.string.isRequired,
};

export default Login;
