//                                                                Right Before Round Begins
function roundPrep(team) {
  document.getElementById('topTitle').className = 'hidden';
  readyBtn.addEventListener('click', countIn);
  var heading = document.createElement('div');
  heading.className = 'roundTextContainer';
  var body = `<span class='roundText'><t class='teamColor'>${team.name}</t>, it's your round.</span><br />
              <span class='roundText'><t class='describerColor'>
              ${team.players[(team.whichPlayersTurn)%team.players.length]}</t>, you're describing.</span><br />
              <span class='roundText'>Your category is <t class='categoryColor'>${categories[((team.position - 1)%categories.length)].name}</t></span>`;
  heading.innerHTML = body;
  list.appendChild(heading);
  if(document.getElementById('passBtn')) {
    document.getElementById('passBtn').parentNode.removeChild(document.getElementById('passBtn'));
  }

}

//                                                                3 2 1 Animation
function countIn() {
  readyBtn.className = 'hidden';
  rulesBtn.className = 'hidden';

  while(list.firstChild) {
    list.removeChild(list.firstChild);
  }
  var countInHTML = `<span class='num one'>3</span>
                    <span class='num two'>2</span>
                    <span class='num three'>1</span>
                    <span class='num Go'>Go!</span>`;
  list.innerHTML = countInHTML;
  setTimeout(roundBegins, 4000);
  readyBtn.removeEventListener('click', countIn);
}
//                                                                Round Executes
function roundBegins() {
	//clear Board
	while(list.firstChild) {
    list.removeChild(list.firstChild);
  }
  readyBtn.className = 'btn initialBtn';
  // Create New Board
  var timerHtml = `<h1 id='timerNumbers'>${timer}</h1>`;
  var timerSection = document.createElement('div');
  timerSection.innerHTML = timerHtml;
  list.appendChild(timerSection);

  var gameDiv = document.createElement('div');
  gameDiv.className = 'describeText';
  gameDiv.innerHTML = `<span id='youMustDescribe'>Describe:</span><br />
  						         <span id='spanWithWordToDescribe'></span><br />`;
  list.appendChild(gameDiv);
  readyBtn.innerHTML = 'Got it!';

    var passButtonHtml = `<button class="btn" id='passBtn'>Pass</button>
                          <span class='hidden' id='noMorePassesSpan'>${noMorePassesText}</span>`;

  readyBtn.insertAdjacentHTML('afterend', passButtonHtml)
  var passBtn = document.getElementById('passBtn');
  passBtn.addEventListener('click', passed);
  readyBtn.removeEventListener('click', roundBegins);
  readyBtn.addEventListener('click', gotIt);

  // Finding which array to use
  var currentTeam = teamObjectsArray[whichTeamPlays%teamObjectsArray.length];
  var checkPosition = (currentTeam.position - 1)%categories.length;
  var catToUse = categories[checkPosition];

  // Check if array needs to be repopulated
    if(catToUse.array.length == 2) {
      for(i = 0; i < catToUse.backUpArray.length; i++) {
        catToUse.array.push(backUpArray[i]);
        }
      }

  var randomIndex = Math.floor(Math.random() * catToUse.array.length);
  var word = catToUse.array[randomIndex];
  var wordBox = document.getElementById('spanWithWordToDescribe');
  wordBox.innerHTML = word;


  // Start Timer
  t = timer - 1;
  var timeLength = timer * 1000;
  function updateCountdown() {
    var countDownNumbers = document.getElementById('timerNumbers');
    countDownNumbers.innerHTML = t;
    t--;
  }
    var stopWatchHere = setInterval(updateCountdown, 1000);
    function stopUpdating() {
      clearInterval(stopWatchHere);
      readyBtn.removeEventListener('click', gotIt);
      document.getElementById('noMorePassesSpan').className = 'hidden';
      roundEnds();
    }
    setTimeout(stopUpdating, timeLength);
}

function roundEnds() {
     //clear Board
  while(list.firstChild) {
    list.removeChild(list.firstChild);
  }
  rulesBtn.className = 'btn initialBtn';
  // Get current information
  var currentTeam = teamObjectsArray[whichTeamPlays%teamObjectsArray.length];
  // increment position
  currentTeam.position += currentTeam.score;
  // display stats
  var checkPosition = (currentTeam.position - 1)%categories.length;
  var catToUse = categories[checkPosition];
  var table = document.createElement('table');
  table.className = 'statsTable';
  var joinedArray = wordsSuccessfullyDescribed.join(', ');
  var stats = `<tr>
                  <th>Team</th>
                  <td>${currentTeam.name}</td>
                </tr>
                <tr>
                  <th>Got \'Em</th>
                  <td>${joinedArray}</td>
                </tr>
                <tr>
                  <th>Round Score</th>
                  <td>${currentTeam.score}</td>
                </tr>
                <tr>
                  <th>Total Score</th>
                  <td>${currentTeam.position - 1}</td>
                </tr>
                  <th>Next Category</th>
                  <td>${catToUse.name}</td>`;
    table.innerHTML = stats;
    list.appendChild(table);
  // Change buttons
  if(drinkRules) {
    var drinkDiv = document.createElement('div');
    var drinkDivContent = ``;
  }
    var mistakesWereMade = document.getElementById('passBtn');
    mistakesWereMade.removeEventListener('click', passed);
    mistakesWereMade.addEventListener('click', mistakes);
    mistakesWereMade.innerHTML = 'Help';

    readyBtn.innerHTML = 'Next Round';
    setTimeout(function() {
      readyBtn.addEventListener('click', leadToRoundPrep);
    }, 1000);
      // LATER ON Create button for editing in case mistakes/cheating
      return;
}

function gotIt() {
  var wordBox = document.getElementById('spanWithWordToDescribe');
  //                                                    Get rid of uncaught type error
  if(wordBox!=null) {
    readyBtn.removeEventListener('click', gotIt);
    var currentTeam = teamObjectsArray[whichTeamPlays%teamObjectsArray.length];
    var checkPosition = (currentTeam.position - 1)%categories.length;
    var catToUse = categories[checkPosition];
    var currentWord = wordBox.innerHTML;
    var indexOfCurrentWord = catToUse.array.indexOf(`${currentWord}`);
    wordsSuccessfullyDescribed.push(currentWord);
    catToUse.array.splice(indexOfCurrentWord, 1);
    // Check if array needs to be repopulated
    if(catToUse.array.length == 2) {
      for(i = 0; i < catToUse.backUpArray.length; i++) {
        catToUse.array.push(backUpArray[i]);
        }
      }

    var randomIndex = Math.floor(Math.random() * catToUse.array.length);
    var newWord = catToUse.array[randomIndex];

    wordBox.innerHTML = newWord;
    currentTeam.score++;
    setTimeout(function() {
      readyBtn.addEventListener('click', gotIt);
    }, 600);
  }
}

function passed() {
  var passBtn = document.getElementById('passBtn');
var currentTeam = teamObjectsArray[whichTeamPlays%teamObjectsArray.length];
  if(currentTeam.passesUsed == maximumPasses) {
    let passesAllGone = document.getElementById('noMorePassesSpan');
    passesAllGone.className = 'noMorePassesSpan';
    passBtn.removeEventListener('click', passed);
    // setTimeout(function(){passesAllGone.className = 'hidden';}, 2000);
    return;
  } else {
    var wordBox = document.getElementById('spanWithWordToDescribe');
    var currentWord = wordBox.innerHTML;
    var checkPosition = (currentTeam.position - 1)%categories.length;
    var catToUse = categories[checkPosition];
    var indexOfCurrentWord = catToUse.array.indexOf(`${currentWord}`);
    catToUse.array.splice(indexOfCurrentWord, 1);

     // Check if array needs to be repopulated
  // var backUpArray = backUpCategories[checkPosition];
  if(catToUse.array.length == 2) {
    for(i = 0; i < catToUse.backUpArray.length; i++) {
      catToUse.array.push(backUpArray[i]);
      }
    }

    var randomIndex = Math.floor(Math.random() * catToUse.array.length); // IF UNDEFINED EVER APPEARS IN DESCRIBE BOX, ADD A MINUS 1 HERE
    var newWord = catToUse.array[randomIndex];
    wordBox.innerHTML = newWord;
    currentTeam.passesUsed++;
  }
}
function mistakes() {
  alert('This app is so bad and John is so lazy that this button doesn\'t even do anything');
}
function leadToRoundPrep() {
  //clear Board
while(list.firstChild) {
 list.removeChild(list.firstChild);
}

  // empty wordsSuccessfullyDescribed array
  var currentTeam = teamObjectsArray[whichTeamPlays%teamObjectsArray.length];
  currentTeam.whichPlayersTurn += 1;
  currentTeam.score = 0;
  currentTeam.roundsPlayed += 1;
  wordsSuccessfullyDescribed.length = 0;
  readyBtn.removeEventListener('click', leadToRoundPrep);
  if(currentTeam.position - 1 >= toWin) {
    /* checks if Team won and if so
                  creates final page with breakdown of game stats,
                  buttons that will return all variables to normal
                  brings back to initial screen
    */
    // load winning screen
    var winners = document.createElement('div');
    winners.className = 'winnersText';
    var winnersText = `<h1>And the Winners are...</h1>
                        <h1>${currentTeam.name}!</h1>`;
    winners.innerHTML = winnersText;
    var statsTableElement = document.createElement('table');
    statsTableElement.className = 'finalTable';
      var finalTable = `<tr>
                          <th>Teams</th>
                          <th>Final Scores</th>
                          <th>Average Score per Round</th>
                        </tr>`;
      for(let q = 0; q < teamObjectsArray.length; q++) {
         finalTable += `<tr>
                          <td>${teamObjectsArray[q].name}</td>
                          <td>${teamObjectsArray[q].position - 1}</td>
                          <td>${(teamObjectsArray[q].position - 1)/(teamObjectsArray[q].roundsPlayed)}</td>
                        </tr>`;
      }
      statsTableElement.innerHTML = finalTable;
      list.appendChild(winners);
      list.appendChild(statsTableElement);

  readyBtn.removeEventListener('click', gotIt);
  readyBtn.addEventListener('click', homePage);
  readyBtn.innerHTML = 'Home';
  return;
} else {
  whichTeamPlays += 1;
  var newTeam = teamObjectsArray[whichTeamPlays%teamObjectsArray.length];
  roundPrep(newTeam);
  }
}
function homePage() {
  while(list.firstChild) {
    list.removeChild(list.firstChild);
  }
  readyBtn.innerHTML = 'Ready!';
  addItemBtn.className = 'btn initialBtn';
  // addItemBtn.addEventListener("click", addItem); - may not be necessary if we only hid this earlier
  readyBtn.addEventListener("click", grabTeamNames);
  // rulesBtn.addEventListener('click', showRules); - think button is always there and has event listener still
  // document.getElementById('closeRules').addEventListener('click', hideRules); if above is not necessary than neither is this
  // May need to put entire game in div? Might be a good idea anyway - may not be necessary if we only hid this earlier
  // alert('Yeah this doesn\'t do anything either');
  // alert('You should fix that');

  noOfTeams = 0;
  noOfPlayers = 0;
  teamNamesArray.length = 0;
  playerNamesArray.length = 0;
  teamObjectsArray.length = 0;
  whichTeamPlays = 0;
  categories.length = 0;
  // reset game
}
