var update = document.getElementById("updateProfile");
var theUserName = document.getElementById("theUser");

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

    theUserName.innerHTML = email;

    update.onclick = function(){
		updateSummoner(uid);
	}

  } else {
    // User is signed out.
    // ...
  }
});



function updateSummoner(theID){
	theData.ref("User/" + theID).set({
  			Summoner: document.getElementById("summonerField").value,
  		});
}

