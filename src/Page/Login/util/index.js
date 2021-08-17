import checkFields from './checkFields';

export const loginInputs = [
    {
        inputProps: {
            name: 'email',
            type: 'email',
            info: "L'email doit être valide.",
        },
        labelTitle: 'Email',
        labelProps: {
            htmlFor: 'email',
        },
    },
    {
        inputProps: {
            name: 'password',
            type: 'password',
            info: 'Le mot de passe doit faire 8 caractères minimum.',
        },
        labelTitle: 'Mot de passe',
        labelProps: {
            htmlFor: 'password',
        },
    },
];

export const signupInputs = [
    {
        inputProps: {
            name: 'email',
            type: 'email',
            info: "L'email doit être valide.",
        },
        labelTitle: 'Email',
        labelProps: {
            htmlFor: 'email',
        },
    },
    {
        inputProps: {
            name: 'username',
            type: 'text',
            info: 'Le pseudonyme doit faire entre 8 et 20 caractères. (lettres ou chiffres + lettres)',
        },
        labelTitle: 'Pseudonyme',
        labelProps: {
            htmlFor: 'username',
        },
    },
    {
        inputProps: {
            name: 'password',
            type: 'password',
            info: 'Le mot de passe doit faire 8 caractères minimum.',
        },
        labelTitle: 'Mot de passe',
        labelProps: {
            htmlFor: 'password',
        },
    },
    {
        inputProps: {
            name: 'confPass',
            type: 'password',
            info: 'Les mots de passe doivent être identiques.',
        },
        labelTitle: 'Confirmez le mot de passe',
        labelProps: {
            htmlFor: 'confPass',
        },
    },
];

export const makeAction = (type, payload) => ({
    type,
    payload,
});

export const dispatchByInputName = (inputName, dispatch, event) =>
    ({
        email: () => dispatch(makeAction('NEW_EMAIL', event.target.value)),
        username: () =>
            dispatch(makeAction('NEW_USERNAME', event.target.value)),
        password: () =>
            dispatch(makeAction('NEW_PASSWORD', event.target.value)),
        confPass: () =>
            dispatch(makeAction('NEW_CONF_PASS', event.target.value)),
    }[inputName]);

export { checkFields };
