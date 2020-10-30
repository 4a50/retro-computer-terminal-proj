'use strict'
var maxString = 'Version 3.30 (C)Copyright International Business Machines Corp 1981, 1987';
var userInput = '';
var firstReturn = true;
var monitorArray = [];//['Initial OS 4a50 Systems', 'Initializing Boot Parameters', "[ OK ] Synching mainframe to digital domains", "Connected at (1200) bps", "Running TELNET query", "Response Received - 10b"];
var monitorLineTracker = 0;
var maxLinesOnScreen = 23;

//Set's the <p> tags for the number of lined on the screen
//Add all the elements of the monitorArray
function initMonitor() {
  for (var i = 0; i < maxLinesOnScreen; i++) {
    $("#monitor-display").append(`<p id="line-${i}"><br />`);
  }
}
function addTextToLineScreen() {
  $(`#line-${monitorLineTracker}`).html(userInput);
}
function addNextLineToScreen() {

  evalUserCommand(userInput.toUpperCase());
  monitorLineTracker++;
}
/// Main Function to determine what to do with the input
function userInputManagement(charCode, nonText = false) {
  if (nonText) {
    if (charCode === 8) { //BackSpace      
      if (userInput.length > 0) {
        console.log('BSPACE yo!');
        userInput = userInput.slice(0, -1);
      }
    }
    else if (charCode === 13) { //ENTER
      addNextLineToScreen();
    }
  }
  else {
    userInput += String.fromCharCode(charCode);
    console.log(userInput);

  }
  addTextToLineScreen();

}
function evalUserCommand(cmdEval) {
  console.log("Processing Request");
  monitorLineTracker++;
  if (cmdEval.charCodeAt(0) === 13) { cmdEval = cmdEval.slice(1); } // Weeds out the CR that gets put into the string

  switch (cmdEval) {
    case 'CLS':
      console.log('Clearing the Screen');
      clearTheScreen();
      break;
    case 'JP.EXE':
      $(`#line-${monitorLineTracker}`).html('-= JP =- is the creator of this little app');
      break;
    case 'CHKDSK':
      $(`#line-${monitorLineTracker}`).html('I\'m not going to check storage.  To much work');
      break;
    case 'PARKER':
      $(`#line-${monitorLineTracker}`).html('Ahh Yes!  The gentleman with the Axolotls!');
      break;
    default:

      console.log('Bad command or filename');
      $(`#line-${monitorLineTracker}`).html('Bad command or filename');
      break;
  }
  monitorArray.push(userInput);
  userInput = '';
}

function clearTheScreen() {
  monitorArray = [];
  monitorLineTracker = -1;
  for (var i = 0; i < maxLinesOnScreen; i++) {
    $(`#line-${i}`).html(`<br />`);
  }


}
//Events
//text input
$("body").keypress(function (e) {
  var charCode = (e.charCode ? e.charCode : e.which);
  userInputManagement(charCode);

});
//Non-Text Input
$("body").keydown(function (e) {
  var charCode = (e.charCode ? e.charCode : e.which);
  userInputManagement(charCode, true);

});

//Execute
initMonitor();