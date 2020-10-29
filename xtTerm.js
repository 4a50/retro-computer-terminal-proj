'use strict'
var maxString = 'Version 3.30 (C)Copyright International Business Machines Corp 1981, 1987';
console.log(maxString.length);
var userInput = [];
var userInputString = '';
var monitorArray = [];//['Initial OS 4a50 Systems', 'Initializing Boot Parameters', "[ OK ] Synching mainframe to digital domains", "Connected at (1200) bps", "Running TELNET query", "Response Received - 10b"];
var monitorLineTracker = 0;
var maxLinesOnScreen = 23;

//Set's the <p> tags for the number of lined on the screen
//Add all the elements of the monitorArray
function initMonitor() {
  for (var i = 0; i < maxLinesOnScreen; i++) {
    monitorArray.push('<br />');
    $("#monitor-display").append(`<p id="line-${i}">${monitorArray[monitorArray.length - 1]}`);
  }
}
function addTextToLineScreen() {
  $(`#line-${monitorLineTracker}`).html(userInput);
}
function addNextLineToScreen() {
  userInputString = userInput.join('');
  console.log('userToString: ' + userInputString);
  evalUserCommand();
  userInput = [];
  monitorLineTracker++;
}
function evalUserCommand() {
  console.log("Processing Request");
}



function userInputManagement(charCode, nonText = false) {
  if (nonText) {
    if (charCode === 8) { //BackSpace      
      if (userInput.length > 0) {
        userInput.pop();
      }
    }
    else if (charCode === 13) { //ENTER
      addNextLineToScreen();
    }
  }
  else {
    userInput.push(String.fromCharCode(charCode));

  }
  addTextToLineScreen();
  console.log(userInput);
}


//Events
//text input
$("body").keypress(function (e) {
  var charCode = (e.charCode ? e.charCode : e.which);
  console.log(`Char: ${String.fromCharCode(charCode)}    Code: ${charCode}`);
  userInputManagement(charCode);

});
//Non-Text Input
$("body").keydown(function (e) {
  var charCode = (e.charCode ? e.charCode : e.which);
  console.log(`Char: ${String.fromCharCode(charCode)}    Code: ${charCode}`);
  userInputManagement(charCode, true);

});

//Execute
initMonitor();