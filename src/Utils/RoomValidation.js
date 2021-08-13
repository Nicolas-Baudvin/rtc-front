const messages = [
    'Le mot de passe doit faire entre 6 et 30 caractères',
    'Le nom du salon doit faire entre 3 et 30 caractères',
    'Le nom du salon ne doit comporter que des chiffres et des lettres',
];

class RoomValidation {
    roomName;
    roomPass;
    errors = {};

    constructor({ roomName, roomPass }) {
        this.roomName = roomName;
        this.roomPass = roomPass;
        this.checkBody();
    }

    getErrors() {
        return this.errors;
    }

    checkBody() {
        this.checkRoomName();
        this.checkRoomPass();
    }

    checkRoomPass() {
        if (this.roomPass.length > 30 || this.roomPass.length < 6) {
            this.errors = {
                ...this.errors,
                roomPass: messages[0],
            };
        }
    }

    checkRoomName() {
        const isRoomNameCorrect = /^[a-zA-Z0-9]+$/.test(this.roomName);
        if (!isRoomNameCorrect) {
            this.errors = {
                ...this.errors,
                roomName: messages[2],
            };
        } else if (this.roomName.length < 3 || this.roomName.length > 30) {
            this.errors = {
                ...this.errors,
                roomName: messages[1],
            };
        }
    }
}

export default RoomValidation;
