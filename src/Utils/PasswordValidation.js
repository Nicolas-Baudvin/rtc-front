const messages = [
    'Le mot de passe doit faire entre 8 et 30 caractères',
    'Les mots de passe sont différents !',
];

class PasswordValidation {
    newPass;
    newPassConf;
    errors;

    constructor({ newPass, newPassConf }) {
        this.newPassConf = newPassConf;
        this.newPass = newPass;
        this.checkBody();
    }

    get errors() {
        return this.errors;
    }

    checkBody() {
        this.checkNewPassConf();
        this.checkNewPass();
    }

    checkNewPass() {
        if (this.newPass.length < 8 || this.newPass.length > 30) {
            this.errors = {
                ...this.errors,
                newPass: messages[0],
            };
        }
    }

    checkNewPassConf() {
        if (this.newPass !== this.newPassConf) {
            this.errors = {
                ...this.errors,
                newPass: messages[1],
            };
        }
    }
}

export default PasswordValidation;
