
var button1 = document.getElementById("button1");
var button2 = document.getElementById("button2");
var button3 = document.getElementById("button3");
var button4 = document.getElementById("button4");
var button5 = document.getElementById("button5");

var P1 = document.getElementById("P1");
var P2 = document.getElementById("P2");
var P3 = document.getElementById("P3");
var P4 = document.getElementById("P4");
var P5 = document.getElementById("P5");

var theSubmitButton = document.getElementById("submitButton");
var theSaveButton = document.getElementById("saveButtonCall");
var addPlayerButton = document.getElementById("addPlayer")

var option1 = document.getElementById("option1");
var option2 = document.getElementById("option2");
var option3 = document.getElementById("option3");
var option4 = document.getElementById("option4");

let indexval;

var currentButtonClicked;

let playerchange;

var dropList = document.getElementById("teamSelect");

var numPlayers;


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var user = firebase.auth().currentUser;
    var displayName = user.displayName;
    var email = user.email;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;   
    var currentList;


    
   
    //populates the dropdown list with users teams
    var dropRef = theData.ref("Teams/");
    var i = 1;
    dropRef.once('value', function(snapshot){
    	snapshot.forEach(function(data){
    		if(data.val().Captain == uid){
    			document.getElementById('option' + i).innerHTML = data.key;
			i++;
    		}
		});
    });

    //when a different team is selected from the dropdown this is called
    dropList.onchange = function(){
    	getIndex(uid);
    	dropDownSelection(uid);
    	clearBench();
    	clearRoster();
    }

    addPlayerButton.onclick = function(){
    	sendTeamRequest(uid);
    }


    theSubmitButton.onclick = function(){
    	
    	writeData(currentDropdownSelection(), uid);
    }

    theSaveButton.onclick = function(){
    	saveButton(uid);
    }
    
    
    

     
  
    
  } else {
    // User is signed out.
    // ...
  }
});

//function to select the team also passes the user ID to the getvalue function to view each teams player list
function dropDownSelection(theID){
	var dropdown = document.getElementById("teamSelect");
    var theSelection = dropdown.selectedIndex;
    var theTeam = dropdown.options[theSelection].text;
    getValue(theTeam, theID);

}

function currentDropdownSelection(){
	var dropdown = document.getElementById("teamSelect");
    var theSelection = dropdown.selectedIndex;
    var theTeam = dropdown.options[theSelection].text;
    return theTeam;
}

// button1.onclick = function(){
// 	myFunction('P1')
// }
// button2.onclick = function(){
// 	myFunction('P2')
// }
// button3.onclick = function(){
// 	myFunction('P3')
// }

//function gets the snapshot data on page load
//function receives theTeam and theID from dropDownSelection()
function getValue(theTeam, theID){
	//gets reference to "player" children in database
	//console.log(theTeam);
	//console.log(theID);
	var theRef = theData.ref("Teams/" + theTeam + "/" + "player");
	//var ul = document.getElementById("theBench");
	var table = document.getElementById('benchID');
	//theRef.on('value', JaredData);
	//orders data by the child "age"
	var i = 1;
	var newString;
	theRef.orderByChild("Index").once('value', function(snapshot) {
		snapshot.forEach(function(data){
			//console.log(data.key + " " + data.val().age);
			//builds the main lineup
			if(i < 6){
				document.getElementById('P' + i).innerHTML = data.key;
			i++;
			}
			else{
				//add a name from firebase to a list node to identify a player position
				var tr = document.createElement('tr');
				tr.setAttribute("id", "benchList");
				var td1 = document.createElement('td');
				td1.setAttribute("id", ('P' + i));
				td1.setAttribute("class", "leagueData");

				var playerName = document.createTextNode(data.key);

				td1.appendChild(playerName);
				
				tr.appendChild(td1);
				tr.appendChild(createButton(i));

				table.appendChild(tr);


				// var li = document.createElement("li");
				// li.appendChild(document.createTextNode(data.key));
				// li.setAttribute("id", ('P' + i));
				// ul.appendChild(li);


				//add buttons to each player on the bench
				//createButton(i);
				numPlayerSetter(i);
				i++;
			}
			
		});
	});
}




function createButton(iterator){
	
	
	var x = document.createElement("BUTTON");
	x.innerHTML = "Move";
	x.setAttribute("id", 'button' + iterator);
	x.setAttribute("class", "moveButtons")
	var string = "P" + iterator;		
	x.setAttribute("onclick", `swapFunction("P" + ${iterator})`);		
	return x;
}




function numPlayerSetter(numOfPlayers){
	numPlayers = numOfPlayers;
}

function clearBench(){
	
	rowsToDelete = numPlayers - 5;
	var rowCount = document.getElementById('benchID').rows.length;
	
	if(rowCount > 1){
		for(var l = 1; l < rowsToDelete+1; l++){
		document.getElementById('benchID').deleteRow(1);
		}
	}
}

function clearRoster(){
	for(var i = 1; i < 6; i++){
		document.getElementById('P' + i).innerHTML = '';
	}
}



// function dropDownValue(theID){
// 	var dropRef = theData.ref(theID + "Teams");
// 	var i = 1;
// 	dropRef.once('value').then(function(snapshot){
// 		snapshot.forEach(function(data){
// 			document.getElementById('option' + i).innerHTML = data.val().TeamName;
// 			console.log(data.val().TeamName);
// 			i++;
// 		});
// 	});
// }

// function dropDownTest(){
// 	console.log(firebase.auth().currentUser);
// }

var count = 0;
var left;
var right;
function swapFunction(playerval){

	playerchange = playerval;
	console.log(playerval);
	//alert(value);
	//console.log(numPlayers);


	var i;
	for (i = 1; i < numPlayers + 1; i++){
		document.getElementById('button' + i).innerHTML = "here";
	}

	
	if(count == 0){
		left = playerval;
		count++;
	}
	else{
		right = playerval;
		var temp = document.getElementById(left).innerHTML;
		//console.log(temp);
		document.getElementById(left).innerHTML = document.getElementById(right).innerHTML;
		document.getElementById(right).innerHTML = temp;
		var n;
		for(n = 1; n < numPlayers + 1; n++){
			document.getElementById('button' + n).innerHTML = "Move";
		}
		count = 0;
	}
	
}


function saveButton(theID){
	//use update to fix problem
	
	var theTeam = currentDropdownSelection();
	for(var i = 1; i < numPlayers + 1; i++){
		updateRef = theData.ref("Teams/" + theTeam + "/" + "player/" + document.getElementById('P' + i).innerHTML);
		updateRef.update({
		Index: i
	});
	}

}



function getIndex(theID){
  	var theTeam = currentDropdownSelection();
  	theData.ref("Teams/" + theTeam + "/" + "Index/Index").on('value', function(snapshot){
  		indexFunction(snapshot.val());
  		//console.log(snapshot.val());
  	});
}


function indexFunction(value){
	indexval = value;
	//console.log(indexval);

}

function writeData(theTeam, theID){
  		console.log(indexval);
  		theData.ref("Teams/" + theTeam + "/" + "player/" + document.getElementById("nameField").value).set({
  			name: document.getElementById("nameField").value,
  			age: document.getElementById("ageField").value,
  			Index: indexval
  		});
  		updateIndex(indexval++, theID); 		
}

function updateIndex(newIndex, theID){
	currentTeam = currentDropdownSelection();
	theData.ref("Teams/" + currentTeam + "/" + "Index").set({
		Index: indexval
	});
}


function sendTeamRequest(theID){
	var TeamRef = theData.ref("User");
	var newTeamRequestKey = firebase.database().ref().child('Pending').push().key;
	TeamRef.once('value', function(snapshot){
    	snapshot.forEach(function(data){
    		var currentUser;
    		console.log(data.val().Summoner)
    		if(data.val().Summoner == document.getElementById('summonerField').value){
    				var request = theData.ref("User/" + data.key + "/" + "Pending/" + newTeamRequestKey);
					request.update({
					Team: currentDropdownSelection()
				});
    		}		
		});
    });
}









// //possibly not needed
// function JaredData(data){
// 	//document.getElementById('P1').innerHTML = data.child('Jared/name').val();
// 	var teamPlayers = data.val();
	
// 	var keys = Object.keys(teamPlayers);
// 	for (var i = 0; i < keys.length; i++){
// 		var k = keys[i];
// 		var names = teamPlayers[k].name;
// 		document.getElementById('P' + (i+1)).innerHTML = names;
// 		console.log(names);
// 	}
// }





