// page loads with: what catagory is coming up -
// do we have to change arrays into objects for this? So that categories is an array of objects?
//


// Right Before Round Begins
function roundPrep(team) {
  readyBtn.addEventListener('click', roundBegins);
  var heading = document.createElement('div');
  var body = `<span class='roundText'>${team.name}, it's your round.</span><br />
              <span class='roundText'>${team.players[(team.whichPlayersTurn)%team.players.length]}, you're describing.</span><br />
              <span class='roundText'>Your category is ${categories[((team.position - 1)%categories.length)].name}</span>`;
  heading.innerHTML = body;
  list.appendChild(heading);
  if(document.getElementById('passBtn')) {
    document.getElementById('passBtn').parentNode.removeChild(document.getElementById('passBtn'));
  }

}

function roundBegins() {
	//clear Board
	while(list.firstChild) {
    list.removeChild(list.firstChild);
  }
  // Create New Board
  var timerHtml = `<h1 id='timerNumbers'>Go!</h1>`;
  var timerSection = document.createElement('div');
  timerSection.innerHTML = timerHtml;
  list.appendChild(timerSection);
  var passButtonHtml = `<button class="btn" id='passBtn'>Pass</button>`;
  var gameDiv = document.createElement('div');
  gameDiv.innerHTML = `<span id='youMustDescribe'>Describe:</span>
  						         <span id='spanWithWordToDescribe'></span>`;
  list.appendChild(gameDiv);
  readyBtn.innerHTML = 'Got it!';
  readyBtn.insertAdjacentHTML('afterend', passButtonHtml)
  readyBtn.removeEventListener('click', roundBegins);
  readyBtn.addEventListener('click', gotIt);
  var passBtn = document.getElementById('passBtn');
  passBtn.addEventListener('click', passed);
  // Finding which array to use
  var currentTeam = teamObjectsArray[whichTeamPlays%teamObjectsArray.length];
  var checkPosition = (currentTeam.position - 1)%categories.length;
  var catToUse = categories[checkPosition];

  // Check if array needs to be repopulated
  var backUpArray = backUpCategories[checkPosition];
    if(catToUse.array.length == 2) {
      for(i = 0; i < backUpArray.length; i++) {
        catToUse.array.push(backUpArray[i]);
        }
      }

  var randomIndex = Math.floor(Math.random() * catToUse.array.length); // IF UNDEFINED EVER APPEARS IN DESCRIBE BOX, ADD A MINUS 1 HERE
  var word = catToUse.array[randomIndex];
  var wordBox = document.getElementById('spanWithWordToDescribe');
  wordBox.innerHTML = word;


  // Start Timer
  t = timer;
  var timeLength = timer * 1000;
  function updateCountdown() {
    var countDownNumbers = document.getElementById('timerNumbers');
    countDownNumbers.innerHTML = t;
    t--;
  }
    var stopWatchHere = setInterval(updateCountdown, 1000);
    function stopUpdating() {
      clearInterval(stopWatchHere);
      roundEnds();
    }
    setTimeout(stopUpdating, timeLength);
}

    /*
    while(list.firstChild) {
      list.removeChild(list.firstChild);
    }
    list.innerHTML = timesUpMessage;
   readyBtn.removeEventListener('click', gotIt);
   readyBtn.addEventListener('click', roundEnds);
   readyBtn.innerHTML ='Continue';
   var mistakesWereMade = document.getElementById('passBtn');
   mistakesWereMade.removeEventListener('click', passed);
   mistakesWereMade.innerHTML = ' '; */

function roundEnds() {
     //clear Board
  while(list.firstChild) {
    list.removeChild(list.firstChild);
  }
  // Get current information
  var currentTeam = teamObjectsArray[whichTeamPlays%teamObjectsArray.length];
  // increment position
  currentTeam.position += currentTeam.score;
  // display stats
  var checkPosition = (currentTeam.position - 1)%categories.length;
  var catToUse = categories[checkPosition];
  var table = document.createElement('table');
  var stats = `<tr>
    <th>Team</th>
    <td>${currentTeam.name}</th>
  </tr>
  <tr>
    <th>Words Successfully Described</th>
    <td>${wordsSuccessfullyDescribed}</td>
  </tr>
  <tr>
    <th>Round Score</th>
    <td>${currentTeam.score}</td>
  </tr>
  <tr>
    <th>Total Score</th>
    <td>${currentTeam.position - 1}</td>
  </tr>
    <th>Your Next Category</th>
    <td>${catToUse.name}</td>`;
    table.innerHTML = stats;
    list.appendChild(table);
  // Change buttons
var mistakesWereMade = document.getElementById('passBtn');
mistakesWereMade.addEventListener('click', mistakes);
mistakesWereMade.innerHTML = 'Something amiss?';

readyBtn.innerHTML = 'Next Round';
readyBtn.removeEventListener('click', gotIt);
readyBtn.addEventListener('click', leadToRoundPrep);




  // What are relevant stats?
  /*    score from last round
        Words successfully described = wordsSuccessfullyDescribed
        Passes used
        Next Category


  // display relevant stats
  // create event listeners for buttons
  // LATER ON Create button for editing in case mistakes/cheating
*/
  return;
}

function gotIt() {
  var wordBox = document.getElementById('spanWithWordToDescribe');
  var currentWord = wordBox.innerHTML;
  var currentTeam = teamObjectsArray[whichTeamPlays%teamObjectsArray.length];       // Add Modulus logic here similar to below?
  var checkPosition = (currentTeam.position - 1)%categories.length;
  var catToUse = categories[checkPosition];
  var indexOfCurrentWord = catToUse.array.indexOf(`${currentWord}`);
  wordsSuccessfullyDescribed.push(currentWord);
  catToUse.array.splice(indexOfCurrentWord, 1);

  // Check if array needs to be repopulated
  var backUpArray = backUpCategories[checkPosition];
  if(catToUse.array.length == 2) {
    for(i = 0; i < backUpArray.length; i++) {
      catToUse.array.push(backUpArray[i]);
      }
    }

  var randomIndex = Math.floor(Math.random() * catToUse.array.length); // IF UNDEFINED EVER APPEARS IN DESCRIBE BOX, ADD A MINUS 1 HERE
  var newWord = catToUse.array[randomIndex];

  wordBox.innerHTML = newWord;
  currentTeam.score++;
}



function passed() {
var currentTeam = teamObjectsArray[whichTeamPlays%teamObjectsArray.length];
  if(currentTeam.passesUsed == maximumPasses) {
    alert('No more passes this round');           // This will need to be changed to something that looks better
    return;
  } else {
    var wordBox = document.getElementById('spanWithWordToDescribe');
    var currentWord = wordBox.innerHTML;
    var checkPosition = (currentTeam.position - 1)%categories.length;
    var catToUse = categories[checkPosition];
    var indexOfCurrentWord = catToUse.array.indexOf(`${currentWord}`);
    catToUse.array.splice(indexOfCurrentWord, 1);

     // Check if array needs to be repopulated
  var backUpArray = backUpCategories[checkPosition];
  if(catToUse.array.length == 2) {
    for(i = 0; i < backUpArray.length; i++) {
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
  alert('You should make this do something useful at some point');
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
  whichTeamPlays += 1;
  var newTeam = teamObjectsArray[whichTeamPlays%teamObjectsArray.length];

  /*  increment relevant variables
      clear board
      checks if Team won and if so
                creates final page with breakdown of game stats,
                buttons that will return all variables to normal
                brings back to initial screen
      lead back into roundPrep
  */
  readyBtn.removeEventListener('click', leadToRoundPrep);
  roundPrep(newTeam);
}
