import './style.scss';
import { useReducer } from 'react';
import { initialState, reducer } from './reducer';
import { checkFields, dispatchByInputName, inputs } from './util';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { createUser, fetchUserData } from '../../Store/UserData/actions';
import Input from './Input';
import Links from './Links';
import Button from './Button';

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
                        value={state[input.name]}
                        onChange={onChange(input.name)}
                        input={input}
                        page={page}
                        errors={state.errors}
                    />
                ))}
                <Links page={page} />
                <Button page={page} isLoading={isLoading} />
            </form>
        </div>
    );
}

Login.propTypes = {
    page: PropTypes.string.isRequired,
};

export default Login;
