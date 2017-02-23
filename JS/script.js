/**
 * Created by rubenperegrina on 22/2/17.
 */

/*Login*/
$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

/*Authentication*/
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});

/*Sign Out*/
firebase.auth().signOut().then(function() {
    // Sign-out successful.
}, function(error) {
    // An error happened.
});