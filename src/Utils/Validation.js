const messages = [
    "L'email est invalide",
    'Le pseudo doit faire entre 3 et 20 caractères',
    "L'url doit faire moins de 400 caractères",
];

class Validation {
    email;
    username;
    errors;

    constructor({ email, username }) {
        this.email = email;
        this.username = username;
        this.errors = {};
        this.checkBody();
    }

    getErrors() {
        return this.errors;
    }

    checkBody() {
        this.checkEmail();
        this.checkUsername();
    }

    checkUsername() {
        if (this.username.length <= 3 && this.username.length >= 20) {
            this.errors = {
                ...this.errors,
                username: messages[1],
            };
        }
    }

    checkEmail() {
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(this.email).toLowerCase())) {
            this.errors = {
                ...this.errors,
                email: messages[0],
            };
        }
    }
}

export default Validation;
