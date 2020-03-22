class FormValidator {
    constructor() {
        this.data = {
            name: document.querySelector('#nameInput'),
            phone: document.querySelector('#phoneInput'),
            email: document.querySelector('#emailInput')
        };
        this._messages = [];
    }

    set messages(message) {
        this._messages = message;
    }

    get messages() {
        return this._messages;
    }

    validate() {
        if (!this.validateName()) {
            this.data.name.value = this.messages;
        }
        if (!this.validateMail()) {
            this.data.email.value = this.messages;
        }
        if (!this.validatePhone()) {
            this.data.phone.value = this.messages;
        }
        return this.validateName() && this.validatePhone() && this.validateMail();
    }

    validateName() {
        const regExp = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
        if (!(regExp.test(this.data.name.value) && this.data.name.value.length <= 30)) {
            this.messages = 'Your Name is incorrect';
            return 0;
        }
        return 1;
    }

    validatePhone() {
        const regExp = /^[+]*[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/g;
        if (!(regExp.test(this.data.phone.value) && this.data.phone.value.length <= 14 && this.data.phone.value.length >= 12)) {
            this.messages = 'Your phone is incorrect';
            return 0;
        }
        return 1;
    }

    validateMail() {
        const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
        if (!regExp.test(this.data.email.value)) {
            this.messages = 'Please write a real email';
            return 0;
        }
        return 1;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('logForm');
    form.addEventListener('submit', (e) => {
        const validator = new FormValidator();
        validator.validate();
        if (!validator.validate()) {
            e.preventDefault();
        }
    });
});