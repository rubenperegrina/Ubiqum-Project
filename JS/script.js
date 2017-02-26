/**
 * Created by rubenperegrina on 22/2/17.
 */

/*Login*/
/*$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});*/

/*Authentication*/


$(".button").on("click", function() {
    var email = $("#email").val();
    var password = $("#password").val();
    userAuthentication(email, password);
    console.log("este es el email:" + email);
    console.log(password);
});




function userAuthentication(email, password) {
console.log(email);
    $(".username").append("<p>'Hi' + email</p>");
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorCode === 'auth/wrong-password') {
            alert('Wrong password');
        } else {
            alert(errorMessage);
        }
        console.log(error);
        // ...
    });
}


/*Sign Out*/
firebase.auth().signOut().then(function() {
    // Sign-out successful.
}, function(error) {
    // An error happened.
});