/**
 * Created by rubenperegrina on 22/2/17.
 */

/*Login*/
/*$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});*/

/*Authentication*/
//var user = "";

$(document).ready(function () {
	firebase.auth().onAuthStateChanged(function(user) {
		if(user) {
			var email = user.email;
			$(".username").append("<p>Hi " + email + "</p>");
		}
	});
	console.log(firebase.auth());
	$("#login").on("click", function() {
		var email = $("#email").val();
		var password = $("#password").val();
		userAuthentication(email, password);
	});

	$("#logout").on("click", function() {
		logout();
		console.log("You have logged out");
	})

	$("#submitMessage").on("click", function() {
		firebase.auth().onAuthStateChanged(function(user) {
			if(user) {
				sendMessage(user);
			} else {
				console.log("user not logged");
				// No user is signed in.
			}
		});
		console.log("ok");
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

function sendMessage(user) {
	console.log(user);
	var newPost = firebase.database().ref('messages/').push();
	newPost.set({
		user: user.email,
		userID: user.uid,
		message: $("#comment").val()
	});
	// User is signed in.
};

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