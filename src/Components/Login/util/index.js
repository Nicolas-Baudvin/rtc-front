import checkFields from './checkFields';

export const inputs = (page) =>
    page === 'login'
        ? [
              {
                  label: 'Email',
                  name: 'email',
                  type: 'email',
                  info: "L'email doit être valide.",
              },
              {
                  label: 'Mot de passe',
                  name: 'password',
                  type: 'password',
                  info: 'Le mot de passe doit faire 8 caractères minimum.',
              },
          ]
        : [
              {
                  label: 'Email',
                  name: 'email',
                  type: 'email',
                  info: "L'email doit être valide.",
              },
              {
                  label: 'Pseudonyme',
                  name: 'username',
                  type: 'text',
                  info: 'Le pseudonyme doit faire entre 8 et 20 caractères. (lettres ou chiffres + lettres)',
              },
              {
                  label: 'Mot de passe',
                  name: 'password',
                  type: 'password',
                  info: 'Le mot de passe doit faire 8 caractères minimum.',
              },
              {
                  label: 'Confirmation du mot de passe',
                  name: 'confPass',
                  type: 'password',
                  info: 'Les mots de passe doivent être identiques.',
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
