const usernameField = document.querySelector('#username');
const emailField = document.querySelector('#email');
const passwordField = document.querySelector('#password');
const confirmPasswordField = document.querySelector('#confirm-password');
const form = document.querySelector('#form');

// ============ Check if a field is REQUIRED
const isRequired = value => (value === '' ? false : true);

// ============ Check if the LENGTH of a field is between min and max
const isBetween = (length, min, max) => !(length < min || length > max);

// ============ Check if the email is valid
const isEmailValid = email => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(email);
};

// ============ Check if a password is string enough
const isPasswordSecure = password => {
  const re = new RegExp(
    '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
  );
  return re.test(password);
};

// *************** ERRORS/SUCCESSES

// =============== Show Error
const showError = (input, message) => {
  // Get the form__group element
  const formGroup = input.parentElement;

  // add the error class
  formGroup.classList.remove('success');
  formGroup.classList.add('error');

  // show the error message
  const error = formGroup.querySelector('small');
  error.textContent = message;
};

// ================ Show Success
const showSuccess = input => {
  // Get the form__group element
  const formGroup = input.parentElement;

  // Remove the error class
  formGroup.classList.remove('error');
  formGroup.classList.add('success');

  // Hide the error message
  const error = formGroup.querySelector('small');
  error.textContent = '';
};

// ===================== VALIDATE INPUT FIELDS ==============

// ===================== Validate the USERNAME field
const checkUsername = () => {
  let valid = false;
  const min = 3,
    max = 25;
  const username = usernameField.value.trim();

  if (!isRequired(username)) {
    showError(usernameField, 'Username cannot be blank.');
  } else if (!isBetween(username.length, min, max)) {
    showError(
      usernameField,
      `Username must be between ${min} and ${max} characters long.`
    );
  } else {
    showSuccess(usernameField);
    value = true;
  }
  return valid;
};

// ==================== Validate EMAIL field
const checkEmail = () => {
  let valid = false;
  const email = emailField.value.trim();
  if (!isRequired(email)) {
    showError(emailField, 'Email cannot be blank.');
  } else if (!isEmailValid(email)) {
    showError(emailField, 'Email format is invalid. Should include "@"');
  } else {
    showSuccess(emailField);
    valid = true;
  }
  return valid;
};

// =================== Validate the PASSWORD field
const checkPassword = () => {
  let valid = false;
  const password = passwordField.value.trim();

  if (!isRequired(password)) {
    showError(passwordField, 'Password cannot be blank.');
  } else if (!isPasswordSecure(password)) {
    showError(
      passwordField,
      'Password must be at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)'
    );
  } else {
    showSuccess(passwordField);
    valid = true;
  }
  return valid;
};

// =================== Validate CONFIRM PASSWORD field
const checkConfirmPassword = () => {
  let valid = false;

  // check confirm
  const confirmPassword = confirmPasswordField.value.trim();
  const password = passwordField.value.trim();

  if (!isRequired(confirmPassword)) {
    showError(confirmPasswordField, 'Please reenter your password.');
  } else if (password != confirmPassword) {
    showError(confirmPasswordField, 'Passwords do not match!');
  } else {
    showSuccess(confirmPasswordField);
    valid = true;
  }
  return valid;
};

// ================== Validate the inputs on submit
form.addEventListener('submit', function (event) {
  // Prevent the form from submitting to the server
  event.preventDefault();

  // Validate the forms
  const isUsernameValid = checkUsername(),
    isEmailValid = checkEmail(),
    isPasswordValid = checkPassword(),
    isConfirmPasswordValid = checkConfirmPassword();

  const isFormValid =
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid;

  // Submit to the server if the form is valid
  // ............
});

// =========******* DEBOUNCE FUNCTION *******===========
const debounce = (fn, delay = 500) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

// =================== Instant feedback
form.addEventListener(
  'input',
  debounce(function (event) {
    switch (event.target.id) {
      case 'username':
        checkUsername();
        break;
      case 'email':
        checkEmail();
        break;
      case 'password':
        checkPassword();
        break;
      case 'confirm-password':
        checkConfirmPassword();
        break;
    }
  })
);
