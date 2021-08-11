import Input from './Input';
import { useDispatch } from 'react-redux';
import { changeUserDatas } from '../../Store/UserData/actions';

const inputsDesc = [
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

function UserDataForm({ state, onChange }) {
    const dispatch = useDispatch();
    const onSubmit = () => {
        //TODO: Verif
        const userData = {
            email: state.email,
            username: state.username,
            picture: state.picture,
        };
        dispatch(changeUserDatas(userData));
    };
    return (
        <form onSubmit={onSubmit} className={'account-infos'}>
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
            <button className={'button'}>Valider</button>
        </form>
    );
}

export default UserDataForm;
