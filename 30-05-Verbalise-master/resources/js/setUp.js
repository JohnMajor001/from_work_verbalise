// add Item button can add children
addItemBtn.addEventListener("click", addItem);
// getting team names as long as more than 2 are created
readyBtn.addEventListener("click", showSettings);
// add ruleBtn event listener
rulesBtn.addEventListener('click', showRules);
// close rules btn event addEventListener
document.getElementById('closeRules').addEventListener('click', hideRules);
// Add Teams and players
function addItem() {
  // Media Queries for having a certain number of teams
  if(((window.innerWidth <= 700) && (noOfTeams == 5)) || noOfTeams == 8) {
    list.className = 'list_js_media_query';
  }
  if(((window.innerWidth <= 400) && (noOfTeams == 8)) || (window.innerWidth < 1500) && noOfTeams >= 12) {
    list.className = 'list_js_media_query_super';
  }
  if((window.innerWidth <= 500) && (noOfTeams >= 8)) {
    list.className = 'list_js_media_query_super';
  }

  // If ready button is hidden, show it
  // Also change text of add team button
  if(readyBtn.className == 'hideNow') {
    readyBtn.className = 'btn initialBtn';
    addItemBtn.innerHTML = 'Add Another Team';
    document.getElementById('mainTitle').className = 'hideNow';
  }

  noOfTeams += 1;
  noOfPlayers += 2;
  var listItem = document.createElement("li");
  listItem.innerHTML =
    `<img class='deleteBtn teamBtn' onclick="deleteItem(this)"
      src='./resources/images/x_delete_button.png'/>
    <input maxlength="20" class="teamNames" placeholder='Team ${noOfTeams}'>
    </input>
    <div class='playerContainer'>
        <input maxlength="20" class='playerNames' placeholder='Player 1'/>
        <input maxlength="20" class='playerNames' placeholder='Player 2'/>
    </div>
      <button class='addPlayerBtn btn'
        onclick='addPlayer(this)'>+ player</button>`;

  list.appendChild(listItem);
}

function deleteItem(x) {
  x.parentElement.parentNode.removeChild(x.parentElement);
  noOfTeams -= 1;

  // if you end up with no teams, hide ready button
  // Also change wording of add team button
  if (noOfTeams == 0) {
    readyBtn.className = 'hideNow';
    addItemBtn.innerHTML = 'Begin!';
    document.getElementById('mainTitle').className = '';
  }
  // Media queries
  if (((window.innerWidth <= 700) && (noOfTeams == 5)) || ((window.innerWidth >= 700) && noOfTeams == 8)) {
    list.className = '';
  }
  if ((window.innerWidth <= 500) && (noOfTeams < 8)) {
    list.className = '';
  }
}

function addPlayer(x) {
  var text =
        `<input maxlength="20"
        class='playerNames thirdPlayer' placeholder='Player 3'/>`;
  let pContainer = x.parentElement.querySelector('.playerContainer');
  pContainer.insertAdjacentHTML('beforeend', text);
  noOfPlayers += 1;

  // Make this disappear
  x.style.display = 'none';

  // Create new button with delete third player event listener
  let newButton = `<button class='deletePlayerBtn btn'
    onclick='deleteThirdPlayer(this)'>- player</button>`
  x.parentElement.insertAdjacentHTML('beforeend', newButton);
}
function deleteThirdPlayer(x) {
  noOfPlayers -=1;
  x.style.display = 'none';
  let oldButton = x.parentElement.querySelector('.addPlayerBtn');
  oldButton.style.display = 'block';
  let inputPlayerToDelete = x.parentElement.querySelector('.thirdPlayer');
  x.parentElement.querySelector('.playerContainer').removeChild(inputPlayerToDelete);
}

function hideSettings() {
  document.getElementById('settings-container').className = 'hideNow';
}
// Takes message, let's it appear and then it disappears
function inputErrorMessage(message, containerId, messageBoxId) {
  var sign = document.getElementById(containerId);
  var messageBox = document.getElementById(messageBoxId);
  messageBox.innerHTML = message;
  sign.className = '';
  setTimeout(function(){
    sign.className = 'hidden';
  }, 2200);
}
function showSettings() {
  // Check if it's ok to make everything appear
    // 1. Honey Pot
  if(document.getElementById('computer').value != '') {
    alert('something\'s not quite right');
    return;
  }
    // 2. Check correct number of teams
    if(noOfTeams < 2) {
      var message = "You need at least two teams";
      inputErrorMessage(message, 'errorMessageContainer-two-teams',
      'errorMessages-two-teams');
      return;
    }
    // 3. Check Teams have a value entered
    var teamNames = document.querySelectorAll('.teamNames');
    for(i = 0; i < teamNames.length; i++) {
      if(teamNames[i].value.length < 2) {
        var message = 'Enter a team name in all boxes provided';
        inputErrorMessage(message, 'errorMessageContainer-team-names',
        'errorMessages-team-names');
        return;
      }
    }
    // 4. Check playerNames all have a value
    var playerNames = document.querySelectorAll('.playerNames');
    for(i = 0; i < playerNames.length; i++) {
      if(playerNames[i].value.length < 2) {
        var message = 'Enter a player name in all boxes provided';
        inputErrorMessage(message, 'errorMessageContainer-player-names',
        'errorMessages-player-names');
        return;
      }
    }
  // Make everything dis/appear
  document.getElementById('game').className = 'hideNow';
  list.className = 'hideNow';
  document.getElementById('settings-container').className = 'modal-container';

  // Set all variables necessary for gathering setting info from users
    let zero = 0;
    let one = 1;
    let two = 2;
    let three = 3;
    let four = 4;
    let five = 5;

    let twenty = 20;
    let forty = 40;
    let sixty = 60;
    let eighty = 80;
    let hundred = 100;
    let twohundred = 200;

    let easy = 'Easy';
    let regular = 'Regular';

    let thirty = 30;
    let fortyfive = 45;

    let spicy = 'Spicy';
    let standard = 'Standard'
    // CHANGE THIS BACK WHEN DONE TESTING!! Change timer here and in variables
  let settingsHTML = `<h1>Settings</h1>
                      <div class='settings-row'>
                        <span>Points needed to win</span>
                        <select id='pointsToWinSelect'>
                        <option value='${sixty}'>${sixty}</option>
                          <option value='${twenty}'>${twenty}</option>
                          <option value='${thirty}'>${thirty}</option>
                          <option value='${forty}'>${forty}</option>
                          <option value='${eighty}'>${eighty}</option>
                          <option value='${hundred}'>${hundred}</option>
                          <option value='${twohundred}'>${twohundred}</option>
                        </select>
                      </div>
                      <div class='settings-row'>
                        <span>Timer(seconds)</span>
                        <select id='timerSelect'>
                          <option value='${five}'>${five}</option>
                          <option value='${thirty}'>${thirty}</option>
                          <option value='${fortyfive}'>${fortyfive}</option>
                          <option value='${sixty}'>${sixty}</option>
                        </select>
                      </div>
                      <div class='settings-row'>
                        <span>Passes per Round</span>
                        <select id='passesSelect'>
                          <option value='${three}'>${three}</option>
                          <option value='${zero}'>${zero}</option>
                          <option value='${one}'>${one}</option>
                          <option value='${two}'>${two}</option>
                          <option value='${four}'>${four}</option>
                          <option value='${five}'>${five}</option>
                        </select>
                      </div>
                      <div class='settings-row'>
                        <span>Drinking?</span>
                        <select id='drinkingSelect'>
                          <option value='Disabled'>Not Today</option>
                          <option value='Enabled'>Yes, baby!</option>
                        </select>
                      </div>
                      <div class='settings-row'>
                        <span>Difficulty</span>
                        <select id='difficultySetting'>
                          <option value='${regular}'>Regular</option>
                          <option value='${easy}'>Kids</option>
                        </select>
                      </div>
                      <div class='settings-row'>
                        <span>Theme</span>
                        <select id='themes'>
                          <option value='${zero}'>Standard</option>

                        </select>
                      </div>`;
                      /*// <option value='${one}'>Spicy</option>*/

// Change relevant button functions
  document.getElementById('settingsContent').innerHTML = settingsHTML;
  document.getElementById('closeSettings').addEventListener('click', hideSettings);
  document.getElementById('saveSettings').addEventListener('click', saveSettings);
}
function saveSettings() {
  var drinkingSelect = document.getElementById('drinkingSelect').value;
  // Check if drinking rules should be enabled
  if(drinkingSelect == 'Enabled') {
    drinkRules = true;
  } else {
    drinkRules = false;
  }
  // Insert message of responsibility if drinkRules
  if(drinkRules) {
    // insert message, ask if they're sure, if yes start game, if not go back
    if(window.confirm(drinkResponsibleMessage)) {
      grabValuesStartGame();
    } else {
      return;
    }
  } else {
    grabValuesStartGame();
  }


  function grabValuesStartGame() {
    // Gather Team and Player Names in an array
    var teamNames = document.querySelectorAll('.teamNames');
    var playerNames = document.querySelectorAll('.playerNames');
    for(i = 0; i < teamNames.length; i++) {
      teamNamesArray.push(teamNames[i].value);
    }
    for(i = 0; i < playerNames.length; i++) {
      playerNamesArray.push(playerNames[i].value);
    }
    // grab values
    let pointsToWinSelect = document.getElementById('pointsToWinSelect').value;
    let timerSelect = document.getElementById('timerSelect').value;
    let passesSelect = document.getElementById('passesSelect').value;
    if(document.getElementById('difficultySetting').value == 'Easy') {
      ifEasy = true;
    } else {
      ifEasy = false;
    }
    let themeSelected = document.getElementById('themes').value;
        // edit global variables
        timer = timerSelect;
        toWin = pointsToWinSelect;
        maximumPasses = passesSelect;


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
                color: arrayOfTeamColours[i],
                roundsPlayed: 0,
                passesUsed: 0,
                position: 1,
                pastPosition: 1,
                whichPlayersTurn: 0,
              };
            }
            // Find out which categories are to be used
            categories = allThemes[themeSelected];
            // Add and Fill Random Category
            for(i=0; i<categories.length; i++) {
              for(var j = 0; j<categories[i].array.length; j++) {
                randomCategory.array.push(categories[i].array[j]);
              }
              for(var k = 0; k<categories[i].easyArray.length; k++) {
                randomCategory.easyArray.push(categories[i].easyArray[k]);
              }
            }
            categories.push(randomCategory);
              // Push each option in the array of categories into their respective backups
        for(let poop = 0; poop < categories.length; poop++) {
          for(let yo = 0; yo < categories[poop].array.length; yo++) {
            categories[poop].backUpArray.push(categories[poop].array[yo]);
          }
        }
        for(let poop = 0; poop < categories.length; poop++) {
          for(let yo = 0; yo < categories[poop].easyArray.length; yo++) {
            categories[poop].easyBackUpArray.push(categories[poop].easyArray[yo]);
          }
        }
        function startDaGame() {
          document.getElementById('game').className = '';
          list.className = '';
          // Ensure first team that starts is random
        let randomStart = Math.floor(Math.random() * noOfTeams);
        whichTeamPlays += randomStart;



        roundPrep(teamObjectsArray[whichTeamPlays%teamObjectsArray.length]);
          }
          hideSettings();
          // Get rid of what's left on the screen and no longer needed event listeners
          clearStuff();
          addItemBtn.className = 'hideNow';
          readyBtn.removeEventListener("click", showSettings);
          startDaGame();
        }
      }
