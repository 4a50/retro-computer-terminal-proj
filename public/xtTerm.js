'use strict'
// function Neighborhood(rawDataObject) {
//   // "for in" loop -> for property in object
//   for (let key in rawDataObject) {
//     this[key] = rawDataObject[key];
//   }
// }

let maxString = 'Version 3.30 (C)Copyright International Business Machines Corp 1981, 1987';
let userInput = '';
let cpuResponseArray = [];
let monitorArray = [];//['Initial OS 4a50 Systems', 'Initializing Boot Parameters', "[ OK ] Synching mainframe to digital domains", "Connected at (1200) bps", "Running TELNET query", "Response Received - 10b"];
let monitorLineTracker = 0;
let maxLinesOnScreen = 23;
let locationDir = '';

//Set's the <p> tags for the number of lined on the screen
//Add all the elements of the monitorArray
function initMonitor() {
  for (let i = 0; i < maxLinesOnScreen; i++) {
    $('.monitor-readout').append(`<p id="line-${i}"><br />`);
  }
}
function returnKeyPressed() {
  commandEvaluation(userInput.toUpperCase());
  console.log('monitor line tracker:', monitorLineTracker);
  console.log('monitor array length', monitorArray.length);
  monitorLineTracker++;
  if (monitorLineTracker >= maxLinesOnScreen) {
    console.log('Max Lines Reached on Screen.', maxLinesOnScreen, "Lines");
    adjustScreenLines();
  }
}

function adjustScreenLines() {
  while (monitorArray >= maxLinesOnScreen);
  {
    //console.log('adjusting lines on the screen', monitorArray.length)
    monitorLineTracker = 22;
    monitorArray.shift();
    monitorArray.shift();
    refreshScreen();
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
    userInput += String.fromCharCode(charCode);
  }
  lineText();
}
function lineText() {
  $(`#line-${monitorLineTracker}`).html(`[${locationDir}]=> ${userInput}`);
}
function commandEvaluation(cmdEval) {
  let screenOutput = '';
  console.log("Processing Request: cmdEval Length:", cmdEval.length);
  //Set the next line, only called after 'RETURN' key pressed
  monitorLineTracker++;

  if (cmdEval.charCodeAt(0) === 13) { cmdEval = cmdEval.slice(1); } // Weeds out the CR that gets put into the string

  if (cmdEval === 'CLS') { console.log('Clearing the Screen'); clearTheScreen(); }
  else if (!cmdEval) { screenOutput = 'No command given'; console.log('No Entry', monitorLineTracker); }
  else if (cmdEval === 'JP.EXE') { screenOutput = '-= JP =- is the creator of this little app'; }
  else if (cmdEval === 'CHKDSK') { screenOutput = 'I\'m not going to check storage.  To much work'; }
  else if (cmdEval === 'PARKER') { screenOutput = 'Ahh Yes!  The gentleman with the Axolotls!'; }
  else if (cmdEval === 'SETLOCDIR') { screenOutput = 'Location Directory Set to [rabbit]'; locationDir = 'rabbit'; }
  else { screenOutput = 'Bad command or filename'; console.log('Bad command or filename'); }
  monitorArray.push(`[${locationDir}]=> ${userInput}`, screenOutput);

  $(`#line-${monitorLineTracker}`).text(screenOutput);
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



//Execute//

initMonitor();

