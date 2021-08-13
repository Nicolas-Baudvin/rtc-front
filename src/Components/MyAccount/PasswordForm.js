import Input from '../../Reusable/Input';
import { changePassword } from '../../Store/UserData/actions';
import { useDispatch, useSelector } from 'react-redux';
import { PasswordValidation } from '../../Utils';
import { useState } from 'react';
import { VscLoading } from 'react-icons/vsc';
import cx from 'classnames';

const inputsDesc = [
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

const createPassData = (state) => ({
    oldPass: state.oldPass,
    newPass: state.newPass,
    newPassConf: state.newPassConf,
});

function PasswordForm({ onChange, state }) {
    const [passErrors, setPassErrors] = useState({});
    const { isLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const onSubmit = (e) => {
        e.preventDefault();
        setPassErrors({});
        const errors = new PasswordValidation(state).getErrors();
        if (Object.keys(errors).length) {
            return setPassErrors(errors);
        }
        return dispatch(changePassword(createPassData(state)));
    };
    return (
        <form onSubmit={onSubmit} className={'account-infos pass'} action="">
            {inputsDesc.map((input, i) => (
                <Input
                    key={i}
                    inputProps={{
                        ...input.inputProps,
                        value: state[input.inputProps.name],
                        onChange: (e) => onChange(e, input.inputProps.name),
                    }}
                    labelTitle={input.labelTitle}
                    labelProps={input.labelProps}
                    error={passErrors[input.inputProps.name]}
                />
            ))}
            <button className={cx('button', { 'button-loading': isLoading })}>
                {isLoading ? <VscLoading /> : 'Valider'}
            </button>
        </form>
    );
}

export default PasswordForm;
