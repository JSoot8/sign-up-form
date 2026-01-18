const signUpForm = document.querySelector('#signup-form');

signUpForm.addEventListener('submit', (event) => {
    const passwords = signUpForm.querySelectorAll('input[type="password"]');
    const inputContainers = signUpForm.querySelectorAll('.input-container');

    //clear all past errors
    inputContainers.forEach((inputContainer) => {
        const existingError = inputContainer.querySelector('.error-msg')
        if(existingError) inputContainer.removeChild(existingError);
    });

    const passwordsMatch = isPasswordMatch(passwords);
    const isFormValid = signUpForm.checkValidity() && passwordsMatch;
    if(!isFormValid) {
        event.preventDefault();
    }

    inputContainers.forEach((inputContainer) => {
        const input = inputContainer.querySelector('input');
        let errors = [];
        let isValid = input.checkValidity();

        if(!isValid && input.id != 'confirm-password'){
            errors.push(`* ${input.placeholder}`);
        }

        if (input.type === 'password' && !passwordsMatch) {
            isValid = false;
            errors.push('* Passwords do not match');
        }

        // Match the class to the validity state
        input.classList.toggle('invalid', !isValid);

        if(!isValid) {
            createError(inputContainer, errors.join('|'));
        }
    });
});

function isPasswordMatch (passwords) {
    if(passwords[0].value === passwords[1].value) {
        return true;
    }
    return false;
}

function createError (inputContainer, message) {
    const input = inputContainer.querySelector('input');
    const errorMsg = document.createElement('p');
    const errorDescription = `${input.id}-error`;

    errorMsg.classList.add('error-msg');
    errorMsg.textContent = message.replace('|', '\n');
    errorMsg.id = errorDescription;

    inputContainer.appendChild(errorMsg);

    input.setAttribute('aria-describedby', errorDescription)
}