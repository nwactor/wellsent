var mode = 'signup';

$('#signin').on('click', function(event) {
	event.preventDefault();

	if(mode === 'login') {
		mode = 'signup';
		$(this).text('Sign Up');
	} else { //mode === 'signup'
		mode = 'login';
		$(this).text('Login');
	}
});

$('#submit-btn').on('click', function(event) {
	event.preventDefault();

	switch(mode) {
		case 'signup':
			trySignUp();
			break;
		case 'login':
			tryLogin();
			break;
		default:
			break;
	}
});

function tryLogin() {

}

function trySignUp() {
	
} 