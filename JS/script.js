/**
 * Created by rubenperegrina on 22/2/17.
 */

/*Login*/
/*$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});*/

/*Authentication*/
$(document).ready(function () {
	$("#login").on("click", function() {
		var email = $("#email").val();
		var password = $("#password").val();
		userAuthentication(email, password);
	});

	//$(".username").append("<p>'Hi' " + email + "</p>");

	$("#logout").on("click", function() {
		logout();
		console.log("You have logged out");
	})
});

/*Sign In*/
function userAuthentication(email, password) {
	console.log(email);
	firebase.auth().signInWithEmailAndPassword(email, password).then(function() {
		window.location.replace("messages.html");
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		if(errorCode === 'auth/wrong-password') {
			alert('Wrong password');
		} else if(errorCode === 'auth/user-not-found') {
			alert('User not found');
		} else if(errorCode === 'auth/invalid-email') {
			alert('Invalid user');
		} else if(errorCode === 'auth/user-disabled') {
			alert('User disabled');
		} else {
			alert(errorMessage);
		}
		console.log(error);
	});
}

/*Sign Out*/
function logout() {
	firebase.auth().signOut().then(function() {
		window.location.replace("index.html");
		// Sign-out successful.
	}, function(error) {
		alert('Unable to log out');
		// An error happened.
	});
}

// TODO modals for the alert messages