import Input from './Input';
import { changePassword } from '../../Store/UserData/actions';
import { useDispatch } from 'react-redux';

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

function PasswordForm({ onChange, state }) {
    const dispatch = useDispatch();
    const onSubmit = () => {
        //TODO: Verif
        const passData = {
            oldPass: state.oldPass,
            newPass: state.newPass,
            newPassConf: state.newPassConf,
        };
        dispatch(changePassword(passData));
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
                />
            ))}
            <button className={'button'}>Changer de mot de passe</button>
        </form>
    );
}

export default PasswordForm;
