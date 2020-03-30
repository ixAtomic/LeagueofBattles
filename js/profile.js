var update = document.getElementById("updateProfile");
var theUserName = document.getElementById("theUser");

//checks login status
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    // ...
    document.getElementById("logButton").innerHTML = "Sign out";
    theUserName.innerHTML = email;

    update.onclick = function(){
		updateSummoner(uid);
	}

  } else {
    // User is signed out.
    // ...
    document.getElementById("logButton").innerHTML = "Sign in";
  }
});


//puts the ID into the list of users
function updateSummoner(theID){
	theData.ref("User/" + theID).set({
  			Summoner: document.getElementById("summonerField").value,
  		});
}

