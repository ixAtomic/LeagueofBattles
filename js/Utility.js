$("document").ready(function(){
    $(".logOut").on("click", logOut);
  });


  

//logs out user
function logOut(){
    firebase.auth().signOut()
    window.location.href = "logIn.html";
    return false;
}