const profilecForm = document.getElementById('profilec_Form');
const emailField = document.getElementById('email');
const loginButton = document.getElementById('loginBtn_fp');

emailField.addEventListener('keyup', function(event) {
    isValidEmail = emailField.checkValidity();

    if (isValidEmail) {
        loginButton.disabled = false;
    } else {
        loginButton.disabled = true;
    }
});

// loginButton.addEventListener('click', function(event) {
//     profilecForm.submit();
// });