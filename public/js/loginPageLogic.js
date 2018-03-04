var mode = 'signup';

$('#signin').on('click', function(event) {
	event.preventDefault();

	if(mode === 'login') {
		mode = 'signup';
		$('#content-title').text('Sign Up');
		$(this).text('Login');
	} else { //mode === 'signup'
		mode = 'login';
		$('#content-title').text('Login');
		$(this).text('Sign Up');
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