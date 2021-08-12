import Input from './Input';
import { useDispatch, useSelector } from 'react-redux';
import { changeUserDatas } from '../../Store/UserData/actions';
import { Validation } from '../../Utils';
import { useState } from 'react';
import cx from 'classnames';
import { VscLoading } from 'react-icons/vsc';

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

const createUserdataObject = (state) => ({
    email: state.email,
    username: state.username,
    picture: state.picture,
});

function UserDataForm({ state, onChange }) {
    const [dataErrors, setDataErrors] = useState({});
    const { isLoading } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const onSubmit = () => {
        setDataErrors({});
        const errors = new Validation(state).getErrors();
        if (Object.keys(errors).length) {
            return setDataErrors(errors);
        }
        return dispatch(changeUserDatas(createUserdataObject(state)));
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
                    error={dataErrors[input.inputProps.name]}
                />
            ))}
            <button className={cx('button', { 'button-loading': isLoading })}>
                {isLoading ? <VscLoading /> : 'Valider'}
            </button>
        </form>
    );
}

export default UserDataForm;
