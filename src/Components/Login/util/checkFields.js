function isEmailValid(email) {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function isUsernameValid(username) {
    return username.length >= 3 && username.length <= 20;
}

function isPasswordValid(password) {
    return password.length >= 8 && password.length <= 50;
}

function arePasswordsEqual({ password, confPass }) {
    return password === confPass;
}

function checkFields(fields) {
    const errors = {};
    if (!isEmailValid(fields.email)) {
        errors.email = "L'email est invalide !";
    }
    if (!isUsernameValid(fields.username)) {
        errors.username = 'Le pseudonyme doit faire entre 8 et 20 caractères';
    }
    if (!isPasswordValid(fields.password)) {
        errors.password = 'Le mot de passe doit faire entre 8 et 50 caractères';
    }
    if (!arePasswordsEqual(fields)) {
        errors.confPass = 'Les mots de passe sont différents';
    }
    return errors;
}

export default checkFields;
