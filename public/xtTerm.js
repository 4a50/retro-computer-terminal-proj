'use strict'

///////////////////////////////
// 23 Lines and 78 Characters!/
///////////////////////////////

let maxString = 'Version 3.30 (C)Copyright International Business Machines Corp 1981, 1987';
let userInput = '';
let cpuResponseArray = [];
let monitorArray = [];//['Initial OS 4a50 Systems', 'Initializing Boot Parameters', "[ OK ] Synching mainframe to digital domains", "Connected at (1200) bps", "Running TELNET query", "Response Received - 10b"];
let monitorLineTracker = 0;
let maxLinesOnScreen = 23;
let maxScreenChars = 78;
let locationDir = '';

//Set's the <p> tags for the number of lined on the screen
//Add all the elements of the monitorArray
function initMonitor() {
  for (let i = 0; i < maxLinesOnScreen; i++) {
    $('.monitor-readout').append(`<p id="line-${i}"><br />`);
  }
  commandPrompt();
}

function returnKeyPressed() {
  commandEvaluation(userInput.toUpperCase());
  console.log('monitor line tracker:', monitorLineTracker);
  console.log('monitor array length', monitorArray.length);
  monitorLineTracker++;
  screenContentManager();

}

function screenContentManager() {
  if (monitorLineTracker >= maxLinesOnScreen) {
    console.log('Max Lines Reached on Screen.', maxLinesOnScreen, "Lines");
    while (monitorArray >= maxLinesOnScreen);
    {
      monitorLineTracker = 22;
      monitorArray.shift();
      monitorArray.shift();
      refreshScreen();
    }
  }

}
/// Main Function to determine what to do with the input
function userInputManagement(charCode, nonText = false) {
  if (nonText) {
    if (charCode === 8) { //BackSpace      
      if (userInput.length > 0) {
        console.log('BACKSPACE!');

        userInput = userInput.slice(0, -1);
      }
    }
    else if (charCode === 13) { //Return Key
      returnKeyPressed();
    }
  }
  else {
    // Concatenates user input keystrokes into the userInput array.
    if (userInput.length <= maxScreenChars - 6) {
      userInput += String.fromCharCode(charCode);
    }
  }
  commandPrompt();
}
function addText(string = 'No Text Given') {
  $(`#line-${monitorLineTracker}`).html(string);
  monitorArray.push(string);
  monitorLineTracker++;
  //TODO standardize the line overrun correction if > 23 lines on screen
}
function commandPrompt() {
  $(`#line-${monitorLineTracker}`).html(`[${locationDir}]=> ${userInput}`);
}
function commandEvaluation(cmdEvalRaw) {
  let cmdEval = cmdEvalRaw.split(' ');

  let screenOutput = '';
  console.log("Processing Request: cmdEval Length:", cmdEval.length);
  //Set the next line, only called after 'RETURN' key pressed
  monitorLineTracker++;

  if (cmdEval[0].charCodeAt(0) === 13) { cmdEval[0] = cmdEval[0].slice(1); } // Weeds out the CR that gets put into the string

  if (cmdEval[0] === 'CLS') { console.log('Clearing the Screen'); clearTheScreen(); }
  else if (!cmdEval[0]) { screenOutput = 'No command given'; console.log('No Entry', monitorLineTracker); }
  else if (cmdEval[0] === 'JP.EXE') { screenOutput = '-= JP =- is the creator of this little app'; }
  else if (cmdEval[0] === 'CHKDSK') { screenOutput = 'I\'m not going to check storage.  To much work'; }
  else if (cmdEval[0] === 'PARKER') { screenOutput = 'Ahh Yes!  The gentleman with the Axolotls!'; }
  else if (cmdEval[0] === 'SETLOCDIR') { screenOutput = 'Location Directory Set to [rabbit]'; locationDir = 'rabbit'; }
  else if (cmdEval[0] === 'POKEDEX') { screenOutput = 'Activating PokeDex...'; locationDir = 'pokedex'; pokedex }
  else { screenOutput = 'Bad command or filename'; console.log('Bad command or filename'); }
  monitorArray.push(`[${locationDir}]=> ${userInput}`, screenOutput);
  $(`#line-${monitorLineTracker}`).text(screenOutput);
  commandExec(cmdEval);
  userInput = '';
}

function clearTheScreen() {
  monitorArray = [];
  monitorLineTracker = -1;
  locationDir = '';
  for (let i = 0; i < maxLinesOnScreen; i++) {
    $(`#line-${i}`).html(`<br />`);
  }
}

function refreshScreen() {
  for (let i = 0; i < maxLinesOnScreen; i++) {
    console.log(`Screen refresh: screenline ${i}: ${monitorArray[i]}`);
    $(`#line-${i}`).html(monitorArray[i]);
  }
}

//Events
//text input
$("body").keypress(function (e) {
  let charCode = (e.charCode ? e.charCode : e.which);
  userInputManagement(charCode);

});
//Non-Text Input
$("body").keydown(function (e) {
  let charCode = (e.charCode ? e.charCode : e.which);
  userInputManagement(charCode, true);

});

function commandExec(userInput) {
  console.log(userInput);
  if (userInput[0] === "POKEDEX") {
    pokedex(userInput[1]);
  }
}

function pokedex(userInput) {
  console.log('Pokemon Command Fired:', userInput);
  addText(`'You requested and entry on ${userInput}?  Well lets see here.`);
  addText(`This is interesting, I having trouble finding information on ${userInput}`);
  addText(`Oh, yes.  There is no API to go fetch.  That makes sense`);


}

//Execute//

initMonitor();

