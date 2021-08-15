import Header from '../../Components/Header';
import './style.scss';
import { useSelector } from 'react-redux';
import { useEffect, useReducer } from 'react';
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
import PasswordForm from './PasswordForm';
import UserDataForm from './UserDataForm';
import { useHistory } from 'react-router-dom';

const dispatchByInputName = (inputName, dispatch) =>
    ({
        email: (e) => dispatch(newEmailValue(e.target.value)),
        username: (e) => dispatch(newUsernameValue(e.target.value)),
        picture: (e) => dispatch(newPictureValue(e.target.value)),
        oldPass: (e) => dispatch(newOldPassValue(e.target.value)),
        newPass: (e) => dispatch(newPasswordValue(e.target.value)),
        newPassConf: (e) => dispatch(newPassConfValue(e.target.value)),
    }[inputName]);

function MyAccount() {
    const history = useHistory();

    const { email, username, picture, token } = useSelector(
        (state) => state.user
    );

    const [state, dispatch] = useReducer(
        reducer,
        initialState({ email, username, picture })
    );

    const onChange = (e, inputName) => {
        dispatchByInputName(inputName, dispatch)(e);
    };

    useEffect(() => {
        if (!token) {
            history.push('/');
        }
    }, []);

    return (
        <div className={'account'}>
            <Header page={'Mon compte'} />
            <UserDataForm state={state} onChange={onChange} />
            <PasswordForm onChange={onChange} state={state} />
        </div>
    );
}

export default MyAccount;
