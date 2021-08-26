export const inputs = [
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
