document.addEventListener('DOMContentLoaded', () => {
  function clearErrorAndHighlight(inputElement) {
    inputElement.classList.remove('invalid');
    inputElement.nextElementSibling.classList.add('invisible');
  }

  const form = document.querySelector('form');

  function validateElement(element) {
    const VALIDATIONS = {
      firstName: {
        valueMissing: 'First name is required',
        patternMismatch: 'Only letters can be used in first name'
      },
      lastName: {
        valueMissing: 'Last name is required',
        patternMismatch: 'Only letters can be used in last name'
      },
      email: {
        valueMissing: 'Email is required',
        patternMismatch: 'This email is not valid',
      },
      phoneNumber: {
        patternMismatch: 'Format must be 123-456-7890 (numbers and hyphens only)',
      },
      password: {
        valueMissing: 'Password is required',
        tooShort: 'Password must be at least 10 characters long',
      },
    };

    if (element.validity.valid) {
      clearErrorAndHighlight(element);
      form.dispatchEvent(new Event('validinput'));
    } else {
      const elementValidations = VALIDATIONS[element.name];
      const validationsToCheck = Object.keys(elementValidations);

      for (let i = 0; i < validationsToCheck.length; i += 1) {
        if (element.validity[validationsToCheck[i]]) {
          displayErrorAndHighlight(element, elementValidations[validationsToCheck[i]]);
        }
      }
    }
  }

  function displayErrorAndHighlight(inputElement, errorMessage) {
    const errorMessageSpan = document.querySelector(`#${inputElement.name}ErrorMessage`);
    errorMessageSpan.textContent = errorMessage;
    errorMessageSpan.classList.remove('invisible');
    inputElement.classList.add('invalid');
  }

  form.addEventListener('keydown', event => {
    if (!event.target.tagName === 'INPUT' || !event.target.name.includes('Name')) return;

    const invalidNameInput = (key) => {
      const NAME_PATTERN = /[a-zA-Z]/;

      return !NAME_PATTERN.test(key);
    };

    if (invalidNameInput(event.key)) {
      event.preventDefault();
    }
  });

  form.addEventListener('focusout', event => {
    if (event.target.classList.contains('formValidate')) {
      validateElement(event.target);
    }
  });

  form.addEventListener('focusin', event => {
    if (event.target.classList.contains('formValidate')) {
      event.target.classList.remove('invalid');
      event.target.nextElementSibling.classList.add('invisible');
    }
  });

  form.addEventListener('validinput', () => {
    if (form.checkValidity()) {
      document.querySelector('#formErrorMessage').classList.add('invisible');
    }
  });

  form.addEventListener('submit', event => {
    event.preventDefault();

    if (form.checkValidity()) {
      console.log('valid form!');
    } else {
      document.querySelector('#formErrorMessage').classList.remove('invisible');
    }
  })
});