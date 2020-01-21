//creates new user
function signUp(){
	var email = document.getElementById("emailField").value;
	var password = document.getElementById("pswdField").value;
	firebase.auth().createUserWithEmailAndPassword(email, password).then(function(result){
		window.location.href = "profile.html";
	}).catch(function(error){
		var errorCode = error.code;
		var errorMessage = error.message;
	});
}




