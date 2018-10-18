// THIS IS WHERE I WILL CODE MY CLIENT-SIDE FUNCTIONS USING $.getJSON
// and to MANIPULATE THE DOM

'use strict';

// ------------ FUNCTIONS FOR MAIN BROWSER PAGE--------------
function loginUser(_username, _password) {
    
    const LOGIN_URL = '/auth/login';

    const user = {
      username: _username,
      password: _password
    };

	const queryA = {
		data: JSON.stringify(user),
        contentType: 'application/json',
        dataType: 'json',
        method: 'POST'
	}
    
    $.getJSON(LOGIN_URL, queryA, function() {
    	console.log("success");
    })
    .done(function(token) {
        localStorage.setItem('authToken', token.authToken);
        localStorage.setItem('username', _username);
        window.location.href = 'home.html';
    })
    .fail(function(err) {
        $('#login-error').prop('hidden', false);
    });
};

function watchLoginSubmit() {
    $('#login-form').on('submit', function(event) {
        event.preventDefault();
        var username = $('#username').val();
        const password = $('#password').val();
        loginUser(username, password);
    });
};

function watchSignUpClick() {
    $('#login').on('click', '.register', function(event) {
        $('#login').prop('hidden', true);
        $('#signUp').prop('hidden', false);
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
    
    const SIGN_UP_URL = '/users';

    const newUser = {
      username: _username,
      password: _password,
      firstName: _firstName,
      lastName: _lastName
    };

    const queryB = {   
        data: JSON.stringify(newUser),
        contentType: 'application/json',
        method: 'POST',
        dataType: 'json'
    };

    $.getJSON(SIGN_UP_URL, queryB, function() {
    	console.log("success");
    })
    .done(function() {
        $('#SignUp-success').prop('hidden', false);
        $('#login').prop('hidden', false);
        $('#signUp').prop('hidden', true);
    })
    .fail(function(err) {
        $('#signUp-error').prop('hidden', false);
    });
};


  $(watchLoginSubmit);
  $(watchSignUpClick);


// ------------ END OF FUNCTIONS FOR MAIN BROWSER PAGE--------------

// -------------START OF FUNCTIONS FOR SEASON PAGES-----------------

// ON SUBMITAL OF NEW PLANT
function onSubmit() {
  $('.js-enter-form').on('submit', function(event) {
    event.preventDefault();
    $('.js-event-results').html("");
  // Userid:
//   "Seed or Plant:" radio button,
	var season = $('.js-season').val();
    var produceName = $('.js-produce-name').val();
    var germinateIndoors = $(this).find('#checkbox').prop('checked');
    var seedOrPlant = $('')
    var plantBy = $('#plantByQuery').val();
    var datePlanted = $('#datePlantedQuery').val();
 // run another function?
  });
}