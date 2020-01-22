var email_id;


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    var user = firebase.auth().currentUser;


    if(user != null){
    	var email_id = user.email;       
      window.location.href = "Index.html";
    }



  } else {
    // No user is signed in.
  }
});


//signs in a user
function signIn(){
	var email = document.getElementById("emailField").value;
	var password = document.getElementById("pswdField").value;
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
		var errorCode = error.code;
		var errorMessage = error.message;

		window.alert("Error : " + errorMessage)
	});
}

//calls sign up html doc
function SignUp(){
  window.location.href = "newAcct.html";
}