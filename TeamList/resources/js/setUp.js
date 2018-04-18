window.onload = function() {
// add Item button can add children
addItemBtn.addEventListener("click", addItem);
// getting team names as long as more than 2 are created
readyBtn.addEventListener("click", grabTeamNames);
// add ruleBtn event listener
rulesBtn.addEventListener('click', showRules);
// close rules btn event addEventListener
document.getElementById('closeRules').addEventListener('click', hideRules);
// Show and hide rules
function showRules() {
  document.getElementById('closeRules').className = 'hidden';
  document.getElementById('modal').className = 'initialModal';
  document.getElementById('modal-container').className = 'initialModal';
  setTimeout(function(){
    document.getElementById('modal').className = 'modal';
    document.getElementById('modal-container').className = 'modal-container';
   // list.className = 'hidden';
  }, 100);

  rulesContent.innerHTML = rulesNo1;
  nextArrow.className = 'rulesArrows';
  nextArrow.addEventListener('click', rulesContentChangeNo2);
}

function rulesContentChangeNo2() {
  document.getElementById('closeRules').className = 'hidden';
  nextArrow.className = 'rulesArrows';
  rulesContent.innerHTML = rulesNo2;
  nextArrow.removeEventListener('click', rulesContentChangeNo2);
  nextArrow.addEventListener('click', rulesContentChangeNo3);
}
function rulesContentChangeNo3() {
  document.getElementById('closeRules').className = 'hidden';
  nextArrow.className = 'rulesArrows';
  rulesContent.innerHTML = rulesNo3;
  nextArrow.removeEventListener('click', rulesContentChangeNo3);
  nextArrow.addEventListener('click', rulesContentChangeNo4)
}
function rulesContentChangeNo4() {
  nextArrow.className = 'hidden';
  rulesContent.innerHTML = rulesNo4;
  document.getElementById('closeRules').className = 'deleteBtn';
}

// Hide Rules
function hideRules() {
  document.getElementById('modal').className = 'hidden';
  document.getElementById('modal-container').className = 'initialModal';
  nextArrow.className = 'rulesArrows';
 // list.className = ' ';
}


// Add Teams and players
function addItem() {
  noOfTeams += 1;
  noOfPlayers += 2;
  var randNum = ((Math.random() * 9999999999) * (Math.random() * 99999999999));
  var randNumId = randNum + noOfTeams;
  var listItem = document.createElement("li");
  listItem.innerHTML = `<img class='deleteBtn teamBtn' id='deleteBtn_${randNumId}' src='./resources/images/x_delete_button.png'/>
                        <input class="teamNames" placeholder='Team ${noOfTeams}'></input>
                        <div class='playerContainer' id='playerContainer_${randNumId}'>
                        <input class='playerNames' placeholder='Player 1'/>
                        <input class='playerNames' placeholder='Player 2'/>
                        </div>
                        <button class='addPlayerBtn btn' id='addPlayer_${randNumId}'>Add third player</button>`;
  document.getElementById('list').appendChild(listItem);
  var buttonDelete = document.getElementById(`deleteBtn_${randNumId}`);
  buttonDelete.addEventListener("click", deleteItem);
  document.getElementById(`addPlayer_${randNumId}`).addEventListener('click', addPlayer);
  nextArrow.addEventListener('click', rulesContentChangeNo2);
}

function addPlayer() {
  noOfPlayers += 1;
  var id = this.id;
  var nOsInId = id.substring(10, id.length);
  var playerContainerId = 'playerContainer_' + nOsInId;
  var player3Id = 'player3Id' + nOsInId;
  var z = document.createElement('li');
  var text = `<input class='playerNames' id='${player3Id}' placeholder='Player 3'/>`;
  z.innerHTML = text;
  var playerContainer = document.getElementById(`${playerContainerId}`);
  playerContainer.appendChild(z);
  this.removeEventListener("click", addPlayer);
  this.innerHTML = 'Delete Third Player';
  this.addEventListener('click', deleteThirdPlayer);
}

function deleteThirdPlayer() {
  noOfPlayers -=1;

  var identity = this.id;
  var identityNos = identity.substring(10, this.id.length);
  var player3Identity = 'player3Id' + identityNos;
  var player3Box = document.getElementById(`${player3Identity}`);
  var playerContainerHere = 'playerContainer_' + identityNos;
  document.getElementById(`${playerContainerHere}`).removeChild(player3Box.parentNode);
  this.removeEventListener('click', deleteThirdPlayer);
  this.addEventListener('click', addPlayer);
  this.innerHTML = 'Add Third Player';
}

function deleteItem() {
  var item = this.parentNode;
  document.getElementById('list').removeChild(item);
  noOfTeams -= 1;
}

function grabTeamNames() {
  var teamNames = document.querySelectorAll('.teamNames');
  var playerNames = document.querySelectorAll('.playerNames');

  if(noOfTeams < 2) {
    alert("You must have at least two teams");          // CHANGE THIS TO SOMETHING GOOD
    return;
  } else {
     //create arrays of team names and player names
  for(i=0; i < teamNames.length; i++) {
      teamNamesArray.push(teamNames[i].value);
      if(teamNames[i].value == '') {
        alert('Please enter your team names');
        for(let y=0; y < teamNames.length; y++) {
          teamNamesArray.pop();
        }
        for(let y=0; y < playerNames.length; y++) {
          PlayerNamesArray.pop();
          return;
        }
      }
    }
    // loop through playerNamesArray to form new array
    for(i=0; i < playerNames.length; i++) {
      playerNamesArray.push(playerNames[i].value);
      if(playerNames[i].value == '') {
        alert('Please enter your Player names');
        for(let y=0; y < teamNames.length; y++) {
          teamNamesArray.pop();
        }
        for(let y=0; y < playerNames.length; y++) {
          PlayerNamesArray.pop();
          return;
        }
      }
    }
// create team Objects
    for(i=0; i < noOfTeams; i++) {
      var numberOfPlayers = list.children[i].querySelector('div').children.length;
      var specificTeamPlayerNames = [];

        for(var k=numberOfPlayers - 1; k >= 0; k--) {
          specificTeamPlayerNames.push(playerNamesArray[k]);
          playerNamesArray.splice(k, 1);
        }

        teamObjectsArray[i] = {
          name: teamNamesArray[i],
          players: specificTeamPlayerNames,
          score: 0,
          roundsPlayed: 0,
          passesUsed: 0,
          position: 1,
          whichPlayersTurn: 0,
        };
      }

    }
  while(list.firstChild) {
    list.removeChild(list.firstChild);
  }
  addItemBtn.className += ' hidden';
  readyBtn.removeEventListener("click", grabTeamNames);
  roundPrep(teamObjectsArray[whichTeamPlays%teamObjectsArray.length]);
  }
}
