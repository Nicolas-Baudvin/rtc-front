const messages = [
    "L'email est invalide",
    'Le pseudo doit faire entre 3 et 20 caractères',
    "L'url doit faire moins de 400 caractères",
];

class Validation {
    email;
    picture;
    username;
    errors;

    constructor({ email, picture, username }) {
        this.email = email;
        this.picture = picture;
        this.username = username;
        this.checkBody();
    }

    get errors() {
        return this.errors;
    }

    checkBody() {
        this.checkEmail();
        this.checkUsername();
        this.checkPicture();
    }

    checkUsername() {
        if (this.username.length >= 3 && this.username.length <= 20) {
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

    checkPicture() {
        if (this.picture.length < 400) {
            this.errors = {
                ...this.errors,
                picture: messages[2],
            };
        }
    }
}

export default Validation;
