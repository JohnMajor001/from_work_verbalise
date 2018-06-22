// Takes 3 variables, returns
function createElementWithInsides(createdInsides, createdElement, placeToAppendTo){
  createdElement.innerHTML = createdInsides;
  placeToAppendTo.appendChild(createdElement);
}
// Takes a category, checks if it needs to be repopulated
function doesArrayRequirePopulation(category) {
  if(category.array.length == 2) {
    for(i = 0; i < category.backUpArray.length; i++) {
      category.array.push(category.backUpArray[i]);
      }
    }
    if(category.easyArray.length == 2) {
    for(i = 0; i < category.easyBackUpArray.length; i++) {
      category.easyArray.push(category.easyBackUpArray[i]);
      }
    }
}
// Which Difficulty of Array should we use?
function whichArrayDifficulty(category) {
  if(ifEasy) {
    var whichArray = category.easyArray;
  } else {
    var whichArray = category.array;
  }
  return whichArray;
}
// return which category to use
function whichCategory() {
  var currentTeam = teamObjectsArray[whichTeamPlays%teamObjectsArray.length];
  var checkPosition = (currentTeam.position - 1)%categories.length;
  var catToUse = categories[checkPosition];
  return catToUse;
}
// Put in new word, couple of other Things - just for got it and else part of passed if statement
function giveMeNewWordAndCo(wordBox) {
  var catToUse = whichCategory();
  var whichArray = whichArrayDifficulty(catToUse);
  var currentWord = wordBox.innerHTML;
  var indexOfCurrentWord = whichArray.indexOf(`${currentWord}`);
  wordsSuccessfullyDescribed.push(currentWord);
  whichArray.splice(indexOfCurrentWord, 1);
  // Check if array needs to be repopulated
  doesArrayRequirePopulation(catToUse);
  getNewWord(wordBox, whichArray);
}
// Get new word and stick it in!
function getNewWord(wordBox, whichArray) {
  var randomIndex = Math.floor(Math.random() * whichArray.length);
  var newWord = whichArray[randomIndex];
  wordBox.innerHTML = newWord;
}

                                                    //   Right Before Round Begins
function roundPrep(team) {
  document.getElementById('mainTitle').className = 'hideNow';
  readyBtn.addEventListener('click', countIn);
  var heading = document.createElement('div');
  heading.className = 'roundTextContainer';
  var body = `<span class='roundText'><t style='color: ${team.color}'>${team.name}</t>, it's your round.</span><br />
              <span class='roundText'><t class='describerColor'>
              ${team.players[(team.whichPlayersTurn)%team.players.length]}</t>, you're describing.</span><br />
              <span class='roundText'>Your category is <t class='categoryColor'>${categories[((team.position - 1)%categories.length)].name}</t></span>
              <br /><span class='roundText>MAKE SURE YOUR TEAMMATES CAN'T SEE THE SCREEN!</span>`;
  heading.innerHTML = body;
  list.appendChild(heading);
  if(document.getElementById('passBtn')) {
    document.getElementById('passBtn').parentNode.removeChild(document.getElementById('passBtn'));
  }
}
//                                                                3 2 1 Animation
function countIn() {
  readyBtn.className = 'hideNow';
  rulesBtn.className = 'hideNow';
  clearStuff();
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
	clearStuff();
  // Make buttons reappear
  readyBtn.className = 'btn initialBtn';
  // Create New Board
  var timerHtml = `<h1 id='timerNumbers'>${timer}</h1>`;
  var timerSection = document.createElement('div');
  createElementWithInsides(timerHtml, timerSection, list);

  var gameDiv = document.createElement('div');
  gameDiv.className = 'describeText';
  var gameInsides = `<span id='youMustDescribe'>Describe:</span><br />
  						       <span id='spanWithWordToDescribe'></span><br />`;
  createElementWithInsides(gameInsides, gameDiv, list);

  readyBtn.innerHTML = 'Got it!';

    var passButtonHtml = `<button class="btn initialBtn" id='passBtn'>Pass</button>
                          <span class='hideNow' id='noMorePassesSpan'>${noMorePassesText}</span>`;

  readyBtn.insertAdjacentHTML('afterend', passButtonHtml)
  var passBtn = document.getElementById('passBtn');
  passBtn.addEventListener('click', passed);
  readyBtn.removeEventListener('click', roundBegins);
  readyBtn.addEventListener('click', gotIt);
  // Finding which array to use
  var catToUse = whichCategory();
  // Check if array needs to be repopulated
  doesArrayRequirePopulation(catToUse);
  // Which array are we meant to use
  var whichArray = whichArrayDifficulty(catToUse);
  var wordBox = document.getElementById('spanWithWordToDescribe');
  getNewWord(wordBox, whichArray);
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
      document.getElementById('noMorePassesSpan').className = 'hideNow';
      roundEnds();
    }
    setTimeout(stopUpdating, timeLength);
}
function roundEnds() {
  // check if an entire round has ended
  var checkIfAllRoundsAreEqual = 0;
  for(i=0; i<teamObjectsArray.length; i++) {
    if(teamObjectsArray[0].roundsPlayed == teamObjectsArray[i].roundsPlayed) {
      checkIfAllRoundsAreEqual++;
    }
  }
  if((checkIfAllRoundsAreEqual == teamObjectsArray.length) && (teamObjectsArray[0].roundsPlayed > 0)) {
    anotherRoundPlayed = true;
  }
     //clear Board
  clearStuff();
  rulesBtn.className = 'btn initialBtn';
  // Get current information
  var currentTeam = teamObjectsArray[whichTeamPlays%teamObjectsArray.length];
  currentTeam.passesUsed -= currentTeam.passesUsed;
  // increment position
  currentTeam.position += currentTeam.score;
  if(currentTeam.roundsPlayed >= 1) {
  currentTeam.pastPosition += currentTeam.score;
  }
  // display stats
  var checkPosition = (currentTeam.position - 1)%categories.length;
  var catToUse = categories[checkPosition];
  var table = document.createElement('table');
  table.className = 'statsTable';
  var joinedArray = wordsSuccessfullyDescribed.join(', ');
  var stats = `<tr>
                  <th>Team</th>
                  <td id='teamAfterRound'>${currentTeam.name}</td>
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

  // If drinking rules have been enabled, do the following
  if(drinkRules) {
    var drinkDiv = document.createElement('div');
    drinkDiv.className = 'drinkTextBox';

    // If the team didn't score anything at all
    if(wordsSuccessfullyDescribed.length == 0) {
      var drinkDivContent =
       `<h1>NOOBS</h1>
        <p>
        <span class='teamColor'>${currentTeam.name}</span>
         take 3 drinks each for that abysmal performance.
        <br /><br />Trouts</p>`;

    // If the team DID score
    } else {
      let randoNumero = Math.floor(Math.random() * tempDrinkingRules.length);
      var randomDrinkLine = tempDrinkingRules[randoNumero];
       var drinkDivContent = `<h1>Pints Pints Pints</h1>
      <p>${currentTeam.name} give out ${wordsSuccessfullyDescribed.length} drink(s) for each item you successfully descibed.</p>
      <p> Also<br />${randomDrinkLine}</p>`;

      var indexOfDrinkLine = tempDrinkingRules.indexOf(randomDrinkLine);
      tempDrinkingRules.splice(indexOfDrinkLine, 1);

      if(tempDrinkingRules.length <= 2) {
        for(let i=0; i < tempDrinkingRulesBackUp.length; i++) {
          tempDrinkingRules.push(tempDrinkingRulesBackUp[i]);
        }
      }
    }
    createElementWithInsides(drinkDivContent, drinkDiv, list);
  }
  var mistakesWereMade = document.getElementById('passBtn');
  mistakesWereMade.removeEventListener('click', passed);
  mistakesWereMade.addEventListener('click', mistakes);
  mistakesWereMade.innerHTML = 'Help';

  readyBtn.innerHTML = 'Continue';
  setTimeout(function() {
    readyBtn.addEventListener('click', showBoard); // leadToRoundPrep
  }, 700);

  return;
}

function showBoard() {
  readyBtn.removeEventListener('click', showBoard);

  // Not sure why mistakesWereMade doesn't exist sometimes but meh
  if(document.getElementById('passBtn')) {
    let mistakesWereMade = document.getElementById('passBtn');
    mistakesWereMade.removeEventListener('click', mistakes);
    mistakesWereMade.parentNode.removeChild(mistakesWereMade);
  }
  
  clearStuff();

  // Make sure that animation frame can begin
  stopFrameNumber -= 4;

  // After each team have played a round, show current standings
  // Make sure Grammar is correct
  let roundOrRounds;
  if(teamObjectsArray[0].roundsPlayed == 1) {
    roundOrRounds = 'round';
  } else {
    roundOrRounds = 'rounds';
  }
  var currentStandings = document.createElement('div');
  currentStandings.id = 'boardKey';
  var currentStandingsFiller =
  `<span>Key:</span>`
  for(i = 0; i < teamObjectsArray.length; i++) {
    let team = teamObjectsArray[i];
    currentStandingsFiller +=
    `<div class='currentStandingsFiller'>
      <div style='background-color: ${team.color}; height: 2rem;
       width: 2rem; borderRadius: 50%;'></div>
      <p style='color: ${team.color};'> ${team.name}, points:${team.position - 1}</p>
    </div>`;
  }

  // ADD Animated board
  var board = document.createElement('canvas');

// MEDIA QUERIES MUST BE SET HERE SO THAT BOARD DOES NOT APPEAR PIXELATED
  // For Mac
  if (window.innerWidth >= 2400) {
    board.width = window.innerWidth/3;
    board.height = board.width;

  } else if ((window.innerWidth < 2400) && (window.innerWidth >= 1300)) {
    board.width = window.innerWidth/3.5;
    board.height = board.width;

  } else if ((window.innerWidth < 1300) && (window.innerWidth >= 800)) {
    board.width = window.innerWidth/2.3;
    board.height = board.width;

  } else if ((window.innerWidth < 800) && (window.innerWidth >= 500)) {
    board.width = window.innerWidth/1.6;
    board.height = board.width;

    // For Phones
  } else if (window.innerWidth < 500) {
      board.width = window.innerWidth;
      board.height = board.width;
  }

  var txt = 'text';
  createElementWithInsides(txt, board, list);
  list.style.height = '100%';
  list.style.backgroundColor = 'black';
  createElementWithInsides(currentStandingsFiller, currentStandings, list);

  // Add Event Listeners
  readyBtn.addEventListener('click', leadToRoundPrep);

  drawOnCanvas(noOfTeams, teamObjectsArray, toWin);
}
function mistakes() { // THIS CAUSES BUGS!!!
  readyBtn.className = 'hideNow';
  var mistakesWereMade = document.getElementById('passBtn');
  mistakesWereMade.removeEventListener('click', mistakes);
  mistakesWereMade.innerHTML = 'Back';
  // change Event LISTENERS
  //clear Board
  clearStuff();
  if(drinkRules) {
    var helpContentEndMessage = 'Also, take a drink for your incompetence, Noob.';
  } else {
    var helpContentEndMessage = 'Also, for shame.';
  }
  var helpContentDiv = document.createElement('div');
  helpContentDiv.id = 'helpContentID';
  usefulNumber += wordsSuccessfullyDescribed.length;
  let helpContent = `<h1>HELP</h1>
                    <div class='helpText'>
                        <span>YOU:Last round, I "accidentally" clicked 'Got it!' too many times...</span><br />
                        <span>ME: *sigh* Use the box below to take away the points you undeservedly gave your team.</span><br />
                        <span>It will contain the number of points you move forward.</span><br />
                        <span>Leave the number at what your score SHOULD have been and then click back.</span>
                    </div>
                    <span id='numberToChange'>${usefulNumber}</span>
                    <div>
                      <img class='helpBtn' id='helpContentPrevArrow' src='./resources/images/previousArrow.png'/>
                      <img class='helpBtn' id='helpContentNextArrow' src='./resources/images/nextArrow.png'/>
                    </div>
                    <span>${helpContentEndMessage}</span>`;
  createElementWithInsides(helpContent, helpContentDiv, list)
                      // Create a back Button
  document.getElementById('helpContentPrevArrow').addEventListener('click', decrement);
  document.getElementById('helpContentNextArrow').addEventListener('click', increment);
  mistakesWereMade.addEventListener('click', back);
}

function back() {
  let passesAllGone = document.getElementById('noMorePassesSpan');
  passesAllGone.className = 'hideNow';
  passesAllGone.innerHTML = noMorePassesText;

  var currentTeam = teamObjectsArray[whichTeamPlays%teamObjectsArray.length];
  currentTeam.position -= currentTeam.score;
  currentTeam.score -= currentTeam.score;
  currentTeam.score += usefulNumber;
  // take number and do stuff to things
  document.getElementById('helpContentPrevArrow').removeEventListener('click', decrement);
  document.getElementById('helpContentNextArrow').removeEventListener('click', increment);
  var mistakesWereMade = document.getElementById('passBtn');
  mistakesWereMade.removeEventListener('click', back);
  mistakesWereMade.addEventListener('click', passed);
  readyBtn.className = 'btn initialBtn';
  usefulNumber -= usefulNumber;
  roundEnds();
}

function decrement() {
// document.getElementById('numberToChange').innerHTML;
  if(usefulNumber == 0) {
    let passesAllGone = document.getElementById('noMorePassesSpan');
    passesAllGone.className = 'noMorePassesSpan';
    passesAllGone.innerHTML = 'Can\'t do that.';
    setTimeout(function(){passesAllGone.className = 'hideNow';}, 2000);
    return;
    } else {
    usefulNumber--;
    document.getElementById('numberToChange').innerHTML = usefulNumber;
    }
}
function increment() {
  if(usefulNumber == wordsSuccessfullyDescribed.length) {
    let passesAllGone = document.getElementById('noMorePassesSpan');
    passesAllGone.className = 'noMorePassesSpan';
    passesAllGone.innerHTML = 'Cheeky! Can\'t do that.';
    setTimeout(function(){passesAllGone.className = 'hideNow';}, 2000);
    return;
    } else {
    usefulNumber++;
    document.getElementById('numberToChange').innerHTML = usefulNumber;
    }
}
function gotIt() {
  var wordBox = document.getElementById('spanWithWordToDescribe');
  //                                                    Get rid of uncaught type error
  if(wordBox!=null) {
    // remove event listener to prevent spam clicking
    readyBtn.removeEventListener('click', gotIt);
    var currentTeam = teamObjectsArray[whichTeamPlays%teamObjectsArray.length];
    giveMeNewWordAndCo(wordBox);
    currentTeam.score++;
    setTimeout(function() {
      readyBtn.addEventListener('click', gotIt);
    }, 400);
  }
}

function passed() {
  var passBtn = document.getElementById('passBtn');
  var currentTeam = teamObjectsArray[whichTeamPlays%teamObjectsArray.length];
  if(currentTeam.passesUsed == maximumPasses) {
    let passesAllGone = document.getElementById('noMorePassesSpan');
    passesAllGone.className = 'noMorePassesSpan';
    passBtn.removeEventListener('click', passed);
    return;
  } else {
    var wordBox = document.getElementById('spanWithWordToDescribe');
    var currentTeam = teamObjectsArray[whichTeamPlays%teamObjectsArray.length];
    giveMeNewWordAndCo(wordBox);
    currentTeam.passesUsed++;
  }
}
function leadToRoundPrep() {
  list.style.backgroundColor = 'rgba(0, 0, 0, 0)';
  //clear Board
clearStuff();
  // empty wordsSuccessfullyDescribed array
  var currentTeam = teamObjectsArray[whichTeamPlays%teamObjectsArray.length];
  currentTeam.whichPlayersTurn += 1;
  currentTeam.score = 0;
  currentTeam.roundsPlayed += 1;
  wordsSuccessfullyDescribed.length = 0;
  readyBtn.removeEventListener('click', leadToRoundPrep);

  // If The team has won do this...
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
    var statsTableElement = document.createElement('table');
    statsTableElement.className = 'finalTable';
    var finalTable = `<tr>
                          <th>Teams</th>
                          <th>Final Scores</th>
                          <th>Average Score per Round</th>
                      </tr>`;
      for(let q = 0; q < teamObjectsArray.length; q++) {
        let numberYOYO = (teamObjectsArray[q].position - 1)/(teamObjectsArray[q].roundsPlayed);
        var numberFixed = numberYOYO.toFixed(2);
         finalTable += `<tr>
                          <td>${teamObjectsArray[q].name}</td>
                          <td>${teamObjectsArray[q].position - 1}</td>
                          <td>${numberFixed}</td>
                        </tr>`;
      }
      createElementWithInsides(winnersText, winners, list);
      createElementWithInsides(finalTable, statsTableElement, list);

  readyBtn.removeEventListener('click', gotIt);
  readyBtn.addEventListener('click', homePage);
  readyBtn.innerHTML = 'Home';
  var mistakesWereMade = document.getElementById('passBtn');
  mistakesWereMade.parentNode.removeChild(mistakesWereMade);

  return;
} else { // If no one has won, do this...
  // Add and Fill Random Category
 categories.pop();
 randomCategory = {
     name: 'Random',
     array: [],
     backUpArray: [],
     easyArray: [],
     easyBackUpArray: [],
   };
   for(i=0; i<categories.length; i++) {
     for(var j = 0; j<categories[i].array.length; j++) {
       randomCategory.array.push(categories[i].array[j]);
     }
     for(var k = 0; k<categories[i].easyArray.length; k++) {
       randomCategory.easyArray.push(categories[i].easyArray[k]);
     }
   }
   categories.push(randomCategory);

  function continueToRoundPrep() {
    list.style.height = 'auto';
    stopFrameNumber += 4;
    whichTeamPlays += 1;
    var newTeam = teamObjectsArray[whichTeamPlays%teamObjectsArray.length];
    readyBtn.removeEventListener('click', continueToRoundPrep);
    clearStuff();
    roundPrep(newTeam);
  }
  continueToRoundPrep();
  }

}

function homePage() {
   location.reload();      // A Bad, short-term solution
  }
