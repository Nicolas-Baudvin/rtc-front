import Header from '../../Components/Header';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useReducer, useState } from 'react';
import {
    initialState,
    newEmailValue,
    newOldPassValue,
    newPassConfValue,
    newPasswordValue,
    newPictureValue,
    newUsernameValue,
    reducer,
} from './reducer';
import Form from '../../Components/Form';
import { useHistory } from 'react-router-dom';
import { PasswordValidation, Validation } from '../../Utils';
import { changePassword, changeUserDatas } from '../../Store/UserData/actions';

const dispatchByInputName = (inputName, dispatch) =>
    ({
        email: (e) => dispatch(newEmailValue(e.target.value)),
        username: (e) => dispatch(newUsernameValue(e.target.value)),
        picture: (e) => dispatch(newPictureValue(e.target.value)),
        oldPass: (e) => dispatch(newOldPassValue(e.target.value)),
        newPass: (e) => dispatch(newPasswordValue(e.target.value)),
        newPassConf: (e) => dispatch(newPassConfValue(e.target.value)),
    }[inputName]);

const inputsPassDesc = [
    {
        inputProps: {
            name: 'oldPass',
            type: 'password',
            info: '',
        },
        labelProps: {
            htmlFor: 'oldPass',
        },
        labelTitle: 'Ancien mot de passe',
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
];

const inputsDataDesc = [
    {
        inputProps: {
            name: 'email',
            type: 'email',
            info: "L'email doit être valide",
        },
        labelProps: {
            htmlFor: 'email',
        },
        labelTitle: 'Email',
    },
    {
        inputProps: {
            name: 'username',
            type: 'text',
            info: 'Le pseudo doit faire entre 3 et 20 caractères',
        },
        labelProps: {
            htmlFor: 'username',
        },
        labelTitle: 'Pseudonyme',
    },
    {
        inputProps: {
            name: 'picture',
            type: 'text',
            info: "L'url doit être valide",
        },
        labelProps: {
            htmlFor: 'picture',
        },
        labelTitle: 'Image de profil',
    },
];

const createUserdataObject = (state) => ({
    email: state.email,
    username: state.username,
    picture: state.picture,
});

const createPassData = (state) => ({
    oldPass: state.oldPass,
    newPass: state.newPass,
    newPassConf: state.newPassConf,
});

function MyAccount() {
    const [passErrors, setPassErrors] = useState({});
    const [dataErrors, setDataErrors] = useState({});
    const { isLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const { email, username, picture, token } = useSelector(
        (state) => state.user
    );

    const [state, locaDispatch] = useReducer(
        reducer,
        initialState({ email, username, picture })
    );

    const onChange = (e, inputName) => {
        dispatchByInputName(inputName, locaDispatch)(e);
    };

    const onPasswordSubmit = (e) => {
        e.preventDefault();
        setPassErrors({});
        const errors = new PasswordValidation(state).getErrors();
        if (Object.keys(errors).length) {
            return setPassErrors(errors);
        }
        return dispatch(changePassword(createPassData(state)));
    };

    const onUserDataSubmit = () => {
        setDataErrors({});
        const errors = new Validation(state).getErrors();
        if (Object.keys(errors).length) {
            return setDataErrors(errors);
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
                inputs={inputsDataDesc}
                onSubmit={onUserDataSubmit}
                state={state}
                onChange={onChange}
                isLoading={isLoading}
                errors={dataErrors}
            />
            <Form
                inputs={inputsPassDesc}
                onSubmit={onPasswordSubmit}
                onChange={onChange}
                state={state}
                errors={passErrors}
                isLoading={isLoading}
            />
        </div>
    );
}

export default MyAccount;
