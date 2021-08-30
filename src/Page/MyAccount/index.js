import Header from '../../Components/Header';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useReducer, useState } from 'react';
import {
    initialState,
    newEmailValue,
    newPassConfValue,
    newPasswordValue,
    newPictureValue,
    newUsernameValue,
    reducer,
} from './reducer';
import Form from '../../Components/Form';
import { useHistory } from 'react-router-dom';
import { PasswordValidation, Validation } from '../../Utils';
import { changeUserDatas } from '../../Store/UserData/actions';
import { inputs } from './inputs';
import PicturesInput from '../../Components/PicturesInput';

const dispatchByInputName = (inputName, dispatch) =>
    ({
        email: (e) => dispatch(newEmailValue(e.target.value)),
        username: (e) => dispatch(newUsernameValue(e.target.value)),
        newPass: (e) => dispatch(newPasswordValue(e.target.value)),
        newPassConf: (e) => dispatch(newPassConfValue(e.target.value)),
    }[inputName]);

const createUserdataObject = (state) => ({
    email: state.email,
    username: state.username,
    newPass: state.newPass,
    newPassConf: state.newPassConf,
    picture: state.picture,
});

function MyAccount() {
    const [errors, setErrors] = useState({});
    const { isLoading, email, username, picture, token } = useSelector(
        (state) => state.user
    );
    const dispatch = useDispatch();
    const history = useHistory();

    const [state, localDispatch] = useReducer(
        reducer,
        initialState({ email, username, picture })
    );

    const onChange = (e, inputName) => {
        dispatchByInputName(inputName, localDispatch)(e);
    };

    const onClick = (e, img) => {
        localDispatch(newPictureValue(img.url));
    };

    const onSubmit = (e) => {
        let errors = {},
            passErrors = {};
        e.preventDefault();
        setErrors({});
        errors = new Validation(state).getErrors();
        if (state.newPass) {
            passErrors = new PasswordValidation(state).getErrors();
        }
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
                children={<PicturesInput onClick={onClick} />}
            />
            <button className={'account-delete button'} onClick={onClick}>
                Supprimer mon compte
            </button>
        </div>
    );
}

export default MyAccount;
