// THIS IS WHERE I WILL CODE MY CLIENT-SIDE FUNCTIONS USING $.getJSON
// and to MANIPULATE THE DOM

'use strict';

// ------------ FUNCTIONS FOR MAIN BROWSER PAGE--------------
function loginUser(_username, _password) {
    
    const user = {
        username: _username,
        password: _password
    };

    $.ajax({
        url: '/api/auth/login',
        data: JSON.stringify(user),
        contentType: 'application/json',
        method: 'POST'
    })
    .done(token => {
        localStorage.setItem('authToken', token.authToken);
        localStorage.setItem('username', _username);
        sendToHomePage();
    })
    .fail(err => {
        $('#login-error').prop('hidden', false);
    });
};

function watchLoginSubmit() {
    $('#login-form').on('submit', event => {
        event.preventDefault();
        const username = $('#username').val();
        const password = $('#password').val();
        loginUser(username, password);
    });
};

function watchSignUpClick() {
    $('#login').on('click', '.register', function(event) {
        $('#login').prop('hidden', true);
        $('#signUp').prop('hidden', false);
        $('#login-error').prop('hidden', true);
    });
    watchSignUpSubmit();
};

function watchSignUpSubmit() {
    $('#signUp-form').on('submit', function(event) {
        event.preventDefault();
        const username = $('#signUp-username').val();
        const password = $('#signUp-password').val();
        const firstName = $('#signUp-firstName').val();
        const lastName = $('#signUp-lastName').val();
        signUpUser(username, password, firstName, lastName);  
    });
};

function signUpUser(_username, _password, _firstName, _lastName) {
    
    const user = {
        username: _username,
        password: _password,
        firstName: _firstName,
        lastName: _lastName
    };
    
    $.ajax({
        url: '/api/users',
        data: JSON.stringify(user),
        contentType: 'application/json',
        method: 'POST'
    })
    .done(function() {
        $('#signUp-success').prop('hidden', false);
        $('#signUp-error').prop('hidden', true);
        $('#login').prop('hidden', false);
        $('#signUp').prop('hidden', true);
    })
    .fail(err => {
        $('#signUp-error').prop('hidden', false);
        $('#signUp-error').html(`<p>${err.responseJSON.message}</p>`);
    });
};

function backToLogin() {
    $('.backLogin').on("click", function() {
        $('#signUp').prop('hidden', true);
        $('#login').prop('hidden', false);
        $('#login-error').prop('hidden', true);
        $('#signUp-error').prop('hidden', true);
    });
};

  $(backToLogin);
  $(watchLoginSubmit);
  $(watchSignUpClick);


// ------------ END OF FUNCTIONS FOR MAIN BROWSER PAGE--------------



