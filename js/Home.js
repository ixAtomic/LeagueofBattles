

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;  
    document.getElementById("user").innerHTML = email;

    // ...
  } else {
    // User is signed out.
    // ...
  }
});

//logs out user
function logOut(){
	firebase.auth().signOut()
	window.location.href = "logIn.html";
}