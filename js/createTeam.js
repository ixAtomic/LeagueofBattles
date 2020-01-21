createTeamButton = document.getElementById("CreateTeam");

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;

    document.getElementById("emailLoc").innerHTML = email; 

    createTeamButton.onclick = function(){
    createTeam(uid);
  }
        
    // ...
  } else {
    // User is signed out.
    // ...
  }
});

function createTeam(theID){
theData.ref("Teams/" + document.getElementById("nameField").value).set({
      TeamName: document.getElementById("nameField").value,
      Captain: theID,
      Index: 1
  });
}
