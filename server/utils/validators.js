module.exports.validateRegisterInput = (
    first_name,
    last_name,
    email,
    username,
    password,
    confimrPassword
) => {
    const errors = {};

    if (first_name === '') {
        errors.first_name = 'First name is required.';
    }

    if (last_name === '') {
        errors.last_name = 'Last name is required.';
    }

    if (email === '') {
        errors.email = 'Email is required.';
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (email.match(regEx)) {
            errors.email = 'Email must be valid.';
        }
    }

    if (username === '') {
        errors.username = 'Username is required.';
    }

    if (password === '') {
        errors.password = 'Password cannot be empty';
    } else if (password !== confimrPassword) {
        errors.confimrPassword = 'Passwords must match';
    };

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (username, password) => {
    const errors = {}

    if (username.trim() === '') {
        errors.username = 'Username is required';
    }
    if (password.trim() === '') {
        errors.password = 'Password is required';
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

