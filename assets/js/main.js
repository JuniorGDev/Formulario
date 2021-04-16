class ValidForm{
    constructor(){
        this.formulario = document.querySelector('.formulario');
        this.event();
    }
    event(){
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }
    handleSubmit(e){
        e.preventDefault();

        const fieldCheck = this.fieldCheck();
        const passwordCheck = this.passwordCheck();

        if (fieldCheck && passwordCheck) {
            alert('Concluido')
        }
    }

    passwordCheck(){
        let valid = true;
        const passwordCheck = document.querySelector('.password');
        const repeatPasswordCheck = document.querySelector('.repeat-password');
        if (passwordCheck.value.length < 6 || passwordCheck.value.length > 12) {
            this.createError(passwordCheck, 'A senha deve conter entre 6 a 12 caracteres');
            valid = false;
        }
        if (passwordCheck.value !== repeatPasswordCheck.value) {
            this.createError(passwordCheck, 'As senhas não coencidem');
            this.createError(repeatPasswordCheck, 'As senhas não coencidem');
            valid = false;
        }
        return valid;
    }

    fieldCheck(){
        let valid = true;
        for (const errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }
        for (let campo of this.formulario.querySelectorAll('input')) {
            const strong = campo.previousElementSibling.innerText;
            if (!campo.value) {
                this.createError(campo, `Campo "${strong}" não pode ficar vazio`);
                valid = false;
            }
            if (campo.classList.contains('cpf')) {
                if (!this.verificCPF(campo.value)) {
                    this.createError(campo, 'CPF inválido');
                    valid = false;
                }
            }
            if (campo.classList.contains('user')) {
                if (!this.verificUser(campo)) valid = false;
            }
        }
        return valid;
    }

    verificUser(valueUser){
        const userName = valueUser.value;
        let valid = true
        if (userName.length < 3 || userName.length > 12) {
            this.createError(valueUser, 'Usuário deve conter de 3 a 12 caracteres');
            valid = false;
        }
        if (!userName.match(/^[a-zA-Z0-9]+$/g)) {
            this.createError(valueUser, 'Usuário deve conter apenas letras e números');
            valid = false;
        }
        return valid;
    }

    verificCPF(valueCPF){
        const cpf = new ValidCPF(valueCPF);
        return cpf.checkCPF();
    }

    createError(campo, msg){
         const div = document.createElement('div');
         div.innerHTML = msg;
         div.classList.add('error-text');
         campo.insertAdjacentElement('afterend', div);
    }
}

const form = new ValidForm();