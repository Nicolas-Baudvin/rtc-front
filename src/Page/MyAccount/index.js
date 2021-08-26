import Header from '../../Components/Header';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useReducer, useState } from 'react';
import {
    initialState,
    newEmailValue,
    newPassConfValue,
    newPasswordValue,
    newUsernameValue,
    reducer,
} from './reducer';
import Form from '../../Components/Form';
import { useHistory } from 'react-router-dom';
import { PasswordValidation, Validation } from '../../Utils';
import { changeUserDatas } from '../../Store/UserData/actions';

const dispatchByInputName = (inputName, dispatch) =>
    ({
        email: (e) => dispatch(newEmailValue(e.target.value)),
        username: (e) => dispatch(newUsernameValue(e.target.value)),
        newPass: (e) => dispatch(newPasswordValue(e.target.value)),
        newPassConf: (e) => dispatch(newPassConfValue(e.target.value)),
    }[inputName]);

const inputs = [
    {
        inputProps: {
            name: 'email',
            type: 'email',
            info: '',
        },
        labelProps: {
            htmlFor: 'email',
        },
        labelTitle: 'Mon email',
    },
    {
        inputProps: {
            name: 'newPass',
            type: 'password',
            info: 'Le mot de passe doit faire entre 8 et 30 caractères',
        },
        labelProps: {
            htmlFor: 'newPass',
        },
        labelTitle: 'Nouveau mot de passe',
    },
    {
        inputProps: {
            name: 'newPassConf',
            type: 'password',
            info: 'Les mots de passes doivent être identiques',
        },
        labelProps: {
            htmlFor: 'newPassConf',
        },
        labelTitle: 'Confirmez mot de passe',
    },
    {
        inputProps: {
            name: 'username',
            type: 'text',
            info: '',
        },
        labelProps: {
            htmlFor: 'username',
        },
        labelTitle: 'Mon pseudonyme',
    },
];

const createUserdataObject = (state) => ({
    email: state.email,
    username: state.username,
    newPass: state.newPass,
    newPassConf: state.newPassConf,
});

function MyAccount() {
    const [errors, setErrors] = useState({});
    const { isLoading, email, username, picture, token } = useSelector(
        (state) => state.user
    );
    const dispatch = useDispatch();
    const history = useHistory();

    const [state, locaDispatch] = useReducer(
        reducer,
        initialState({ email, username, picture })
    );

    const onChange = (e, inputName) => {
        dispatchByInputName(inputName, locaDispatch)(e);
    };

    const onClick = () => {};

    const onSubmit = () => {
        setErrors({});
        const errors = new Validation(state).getErrors();
        const passErrors = new PasswordValidation(state).getErrors();
        if (Object.keys(errors).length || Object.keys(passErrors).length) {
            return setErrors({ ...errors, ...passErrors });
        }
        return dispatch(changeUserDatas(createUserdataObject(state)));
    };

    useEffect(() => {
        if (!token) {
            history.push('/');
        }
    }, []);

    return (
        <div className={'account'}>
            <Header page={'Mon compte'} />
            <Form
                inputs={inputs}
                onSubmit={onSubmit}
                state={state}
                onChange={onChange}
                isLoading={isLoading}
                errors={errors}
            />
            <button className={'account-delete button'} onClick={onClick}>
                Supprimer mon compte
            </button>
        </div>
    );
}

export default MyAccount;
