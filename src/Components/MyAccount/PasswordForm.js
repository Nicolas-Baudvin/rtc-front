import Input from './Input';
import { changePassword } from '../../Store/UserData/actions';
import { useDispatch } from 'react-redux';
import { PasswordValidation } from '../../Utils';
import { useState } from 'react';

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
            <button className={'button'}>Changer de mot de passe</button>
        </form>
    );
}

export default PasswordForm;
