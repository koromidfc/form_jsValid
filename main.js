const form = document.querySelector("#signup")
const togglePassword = document.querySelector('#togglePassword');
const usernameEl = document.forms.formValidate.username
const nameEl = document.forms.formValidate.name
const firstNameEl = document.forms.formValidate.firstname
const emailEl = document.forms.formValidate.email
const dobEl = document.forms.formValidate.dob
const passwordEl = document.forms.formValidate.password
const confPassEl = document.forms.formValidate['confirm-password']
const sexEl = document.forms.formValidate.sex

togglePassword.addEventListener('click', function (e) {
    const type = passwordEl.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordEl.setAttribute('type', type);
    this.textContent = type === 'password' ? '👁️' : '👁️‍🗨️';
});

function isRequired(elementValue) {
    if (elementValue == "") {
        return false
    } else {
        return true
    }
}

function isBetween(length, min, max) {
    if (length < min || length > max) {
        return false
    } else {
        return true
    }
}

function isNameValid(elementValue) {
    const re = /^(?!.*\b(afpa|root|deus)\b)[a-zA-Z.é]+$/;
    return re.test(elementValue);
}

function isValidEmail(email) {
    const regex = /^(?!root@afpa\.fr|afpa@afpa\.com|deus@afpa\.org)(?!.*@yopmail\.com$)[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}
function isPasswordValid(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    return re.test(password);
}

function showError(input, message) {
    const formField = input.parentElement;
    formField.classList.remove("success")
    formField.classList.add("error")
    const errorEl = formField.querySelector("small")
    errorEl.textContent = message
}

function showSuccess(input) {
    const formField = input.parentElement;
    formField.classList.remove("error")
    formField.classList.add("success")
    const errorEl = formField.querySelector("small")
    errorEl.textContent = ""
}
const checkUserName = () => {
    let valid = false
    const min = 3,
        max = 25
    const username = usernameEl.value.trim()
    if (!isRequired(username)) {
        showError(usernameEl, "Le username ne peut pas être vide");
    } else if (!isBetween(username.length, min, max)) {
        showError(
            usernameEl,
            `Le username doit avoir entre ${min} et ${max} caractères.`
        )
    } else if (!isNameValid(username)) {
        showError(
            usernameEl,
            `Le username ne doit contenir que des lettres et ne peut être "root","afpa","deus".`
        )
    } else {
        showSuccess(usernameEl)
        valid = true
    }
    return valid;

}
const checkName = () => {
    let valid = false
    const min = 3,
        max = 25
    const name = nameEl.value.trim()
    if (!isRequired(name)) {
        showError(nameEl, "Le nom d'utilisateur ne peut pas être vide");
    } else if (!isBetween(name.length, min, max)) {
        showError(
            nameEl,
            `Le nom d'utilisateur doit avoir entre ${min} et ${max} caractères.`
        )
    } else if (!isNameValid(name)) {
        showError(
            nameEl,
            `Le nom d'utilisateur ne doit contenir que des lettres et ne peut être "root","afpa","deus".`
        )
    } else {
        showSuccess(nameEl);
        valid = true;
    }
    return valid;

}
const checkFirstName = () => {
    let valid = false
    const min = 3,
        max = 25
    const firstName = firstNameEl.value.trim()
    if (!isRequired(firstName)) {
        showError(firstNameEl, "Le prénom d'utilisateur ne peut pas être vide.");
    } else if (!isBetween(firstName.length, min, max)) {
        showError(
            firstNameEl,
            `Le prénom d'utilisateur doit avoir entre ${min} et ${max} caractères.`
        )
    } else if (!isNameValid(firstName)) {
        showError(
            firstNameEl,
            `Le prénom d'utilisateur ne doit contenir que des lettres et ne peut être "root","afpa","deus".`
        )
    } else {
        showSuccess(firstNameEl);
        valid = true;
    }
    return valid;

}
const checkEmail = () => {
    let valid = false
    const email = emailEl.value.trim()
    if (!isRequired(email)) {
        showError(
            emailEl,
            `L'email ne peut être vide.`
        )
    } else if (!isValidEmail(email)) {
        showError(
            emailEl,
            `L'email doit respecter le format email et ne peut être un yopmail.com ni les mails suivant: "root@afpa.fr", "afpa@afpa.com", "deus@afpa.org".`
        )
    } else {
        showSuccess(email);
        valid = true;
    }
    return valid;
}
const checkDob = () => {
    let valid = false
    const dobval = dobEl.value;
    const dob = new Date(dobval);
    const today = new Date();
    const maxDob = new Date(today.getFullYear()- 120)
    const twentyOneBirthday = new Date(dob.getFullYear() + 21, dob.getMonth(), dob.getDate());
    if (!isRequired(dobval)) {
        showError(dobEl, "Vous devez renseigner votre âge.")
    }
    else if (dob < maxDob) {
        showError(dobEl, "L'année est incorrecte.");
    }
    else if (twentyOneBirthday > today) {
        showError(dobEl, "Vous n'avez pas 21 ans.");
    } else {
        showSuccess(dobEl);
        valid = true;
    }
    return valid;
}
const checkPass = () => {
    let valid = false
    const pass = passwordEl.value.trim()
    if (!isRequired(pass)) {
        showError(passwordEl, 'Le mot de passe ne peut être vide.')
    } else if (!isPasswordValid(pass)) {
        showError(passwordEl, 'Le mot de passe doit comprendre au moins 1 majuscule, 1 chiffre et 1 caratère spécial situé dans cette liste : (!@#$%^&*).')
    } else {
        showSuccess(passwordEl)
        valid = true
    }
    return valid
}
const confPass = () => {
    let valid = false
    const pass = passwordEl.value.trim();
    const conf = confPassEl.value.trim();
    if (!isRequired(conf)) {
        showError(confPassEl, "La confirmation de mot de passe ne peut être vide.")
    } else if (pass !== conf) {
        showError(confPassEl, "Les mots de passes ne correspondent pas.")
    } else {
        showSuccess(confPassEl)
        valid = true
    }
    return valid
}
const checkSex = () => {
    let valid = false
    const sex = sexEl.value
    if (!isRequired(sex)) {
        showError(sexEl, "Vous devez choisir votre bord.")
    } else {
        showSuccess(sexEl)
        valid = true
    }
    return valid
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    let userNameOk = checkUserName(),
        nameOk = checkName(),
        firstNameOk = checkFirstName(),
        emailOk = checkEmail(),
        isAgeOk = checkDob(),
        isPassOk = checkPass(),
        isConfOk = confPass(),
        isSexOk = checkSex();

    let isFormValid = userNameOk && nameOk && firstNameOk && emailOk && isAgeOk && isPassOk && isConfOk && isSexOk;
    if (isFormValid) {
        console.log('Tout est Ok pour l\'envoi')
    }
})

const debounce = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {

        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            fn.apply(null, args);
        }, delay);
    };
};

form.addEventListener(
    "input",
    debounce(function (e) {
        switch (e.target.id) {
            case "username":
                checkUserName();
                break;
            case "name":
                checkName();
                break;
            case "firstname":
                checkFirstName();
                break;
            case "email":
                checkEmail();
                break;
            case "dob":
                checkDob();
                break;
            case "password":
                checkPass();
                break;
            case "confirm-password":
                confPass();
                break;
            case "sex":
                checkSex();
                break;
        }
    })
);