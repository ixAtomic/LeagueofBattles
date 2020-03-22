
var addFriendButton = document.getElementById('findUser');
var displayRequestsButton = document.getElementById('displayRequestsButton');
var TheSummoner;


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;
    var displayName = user.displayName;
    var email = user.email;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;   
    var currentList;

    displayFriendsList(uid);

    addFriendButton.onclick = function(){
    	addFriend(uid)
    }

    displayRequestsButton.onclick = function(){
    	displayRequests(uid);
    }


    } else {
    // User is signed out.
    // ...
	}
});

//sends a friend request
function addFriend(theID){
	var friendReff = theData.ref("User");
	var newFriendRequestKey = firebase.database().ref().child('Pending').push().key;
	friendReff.once('value', function(snapshot){
    	snapshot.forEach(function(data){
    		var currentUser;
    		if(data.val().Summoner == document.getElementById('userField').value){
    				var request = theData.ref("User/" + data.key + "/" + "Pending/" + newFriendRequestKey);
					request.update({
					theID: theID
				});
    		}		
   //  		if(data.val().Captain == uid){
   //  			document.getElementById('option' + i).innerHTML = data.key;
			// i++;
   //  		}
		});
    });
}

//displays user friend requests
var count = 0;
function displayRequests(theID){
	var requestRef = theData.ref("User/" + theID + "/" + "Pending");
	
	//var ul = document.getElementById("friendList");
	var ul = $("friendsList");
	var n = 1;
	if(count == 0){
		requestRef.on('value', function(snapshot){
		snapshot.forEach(function(data){
			var theUID = data.child('theID').val();
			var summonerRef = theData.ref("User/" + theUID + "/" + "Summoner")
			summonerRef.on('value', function(snapshot){
				if(data.child('theID').exists()){
					var li = document.createElement('li');
					var text = document.createTextNode(snapshot.val());
					li.setAttribute("id", ('F' + n));
					li.appendChild(text);
					ul.appendChild(li);

			
					var acceptLI = document.createElement('li');
					var acceptButton = document.createElement("BUTTON");
					acceptButton.innerHTML = ("Accept");
					acceptButton.setAttribute("onclick", 'acceptRequest("' + theID + '", "' + theUID + '", "' + snapshot.val() + '")');
					acceptLI.appendChild(acceptButton);
					ul.appendChild(acceptLI);


					
					var declineLI = document.createElement('li');
					var declineButton = document.createElement("BUTTON");
					declineButton.innerHTML = "Decline";
					declineButton.setAttribute("onclick", 'declineRequest("' + theID + '", "' + theUID + '")');
					declineLI.appendChild(declineButton);
					ul.appendChild(declineLI);

				n++;
				count++;
				}
			});
		});
	});
	}
	else{
		//remove children to close list
		for(var i = 0; i < count; i++){
			ul.removeChild(ul.childNodes[1]);
			ul.removeChild(ul.childNodes[1]);
			ul.removeChild(ul.childNodes[1]);
		}
		count = 0;
	}
	
}



//accepts a user request and adds as friend to the users friend list
function acceptRequest(theSummonerName, theAcceptID, theAcceptSummoner){
	var acceptRef = theData.ref("User/" + theSummonerName + "/" + "Friends/" + theAcceptID)
	acceptRef.update({
		summonerName: theAcceptSummoner
	});
	var deletePending = theData.ref("User/" + theSummonerName + "/" + "Pending")
	deletePending.on('value', function(snapshot) {
		snapshot.forEach(function(data){	
			console.log(data.child('theID').val());
			if(data.child('theID').val() == theAcceptID){
				var deleteHere = theData.ref("User/" + theSummonerName + "/" + "Pending/" + data.key)
				deleteHere.update({
					theID: null
				});
			}
		});
	});
}

//deletes request from user
function declineRequest(theSummonerName, theDeclineID){
	var declineRef = theData.ref("User/" + theSummonerName + "/" + "Pending")
	declineRef.on('value', function(snapshot) {
		snapshot.forEach(function(data){	
			console.log(data.child('theID').val());
			if(data.child('theID').val() == theDeclineID){
				var deleteHere = theData.ref("User/" + theSummonerName + "/" + "Pending/" + data.key)
				deleteHere.update({
					theID: null
				});
			}
		});
	});
}

//dipslays users friends list
function displayFriendsList(theID){
	var listRef = theData.ref("User/" + theID + "/" + "Friends");

	var ul = document.getElementById("viewFriends");
		listRef.on('value', function(snapshot){
		snapshot.forEach(function(data){
			var li = document.createElement('li');
			var text = document.createTextNode(data.val().summonerName);
			li.setAttribute("class", "friendsListElements");
			li.appendChild(text);
			ul.appendChild(li);	
		});
	});

}
			