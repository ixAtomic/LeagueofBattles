$("document").ready(function(){
    $(".sign").on("click", signType)
    $(".signIn").on("click", signIn);
  });

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;  
      
      $(".sign").html("Sign out");
      
      // ...
    } else {
      // User is signed out.
      $(".sign").html("Sign in");
    }
  });

//logs out user
function signType(){
  if(firebase.auth().currentUser == null){
    $("#logInModal").modal("show");
  }
  else{
    firebase.auth().signOut()
  }
  return false;
}


function signIn(){
	var email = document.getElementById("emailField").value;
	var password = document.getElementById("pswdField").value;
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
		var errorCode = error.code;
		var errorMessage = error.message;

		window.alert("Error : " + errorMessage)
	});
}