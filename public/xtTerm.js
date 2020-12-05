'use strict'

///////////////////////////////
// 23 Lines and 78 Characters!/
///////////////////////////////
// TestArray //
let dispArr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22'];
//////////////

let maxString = 'Version 3.30 (C)Copyright International Business Machines Corp 1981, 1987';
let userInput = '';
let cpuResponseArray = [];
let monitorArray = [];//['Initial OS 4a50 Systems', 'Initializing Boot Parameters', "[ OK ] Synching mainframe to digital domains", "Connected at (1200) bps", "Running TELNET query", "Response Received - 10b"];
let monitorLineTracker = 0;
let maxLinesOnScreen = 23;
let maxScreenChars = 78;
let locationDir = '';
let isFullScreenEnabled = false;


//////////////////
// Constructors //
//////////////////

function Pokemon(pokemon) {

  this.name = 'MewTwo';
  this.hp = 200;
  this.entryArray = [];


  this.setTitle = function () {
    console.log('this.name', this.name);
    let pokeDexTitle = ` PokeDex Entry for ${this.name} `;
    let centerText = Math.floor(((maxScreenChars - 4) - pokeDexTitle.length) / 2);
    let charPad = '';
    for (let i = 0; i < centerText; i++) { charPad += '#'; }
    let returnString = (charPad + pokeDexTitle + charPad)
    console.log('return string length', returnString.length);
    return returnString;
  }
  this.entryArray = [this.setTitle(this.name), '# ', `# Name: ${this.name}`, `# HP: ${this.hp}`];
}




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
  if (!isFullScreenEnabled) { monitorLineTracker++; }
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
  if (!isFullScreenEnabled) {
    if (nonText) {
      if (charCode === 8) { //BackSpace      
        if (userInput.length > 0) {
          console.log('BACKSPACE!');

          userInput = userInput.slice(0, -1);
        }
      }
      else if (charCode === 13) { //Return Key
        console.log('user input value when return pressed', userInput);
        returnKeyPressed();
      }
    }
    else {
      // Concatenates user input keystrokes into the userInput array.
      if (userInput.length <= maxScreenChars - 6) {
        userInput += String.fromCharCode(charCode);
      }
    }

    if (!isFullScreenEnabled) { commandPrompt(); }
  } else {
    if (charCode === 32) {
      console.log('Space Pressed');
      isFullScreenEnabled = false;
      userInput = '';
      console.log('isFullEnabled', isFullScreenEnabled);
      commandPrompt();
      clearTheScreen();
    }
  }

}
function addText(string = 'No Text Given') {
  $(`#line-${monitorLineTracker}`).html(string);
  monitorArray.push(string);
  monitorLineTracker++;
  //TODO standardize the line overrun correction if > 23 lines on screen
}
function commandPrompt() {
  console.log('monArrayTackFromCmdPrompt:', monitorLineTracker);
  $(`#line-${monitorLineTracker}`).html(`[${locationDir}]=> ${userInput}`);
}
function commandEvaluation(cmdEvalRaw) {
  console.log('commandEvalRaw', cmdEvalRaw);
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
  else if (cmdEval[0] === 'FST') { fullScreenDisplay(dispArr); }
  else { screenOutput = 'Bad command or filename'; console.log('Bad command or filename'); }
  if (!isFullScreenEnabled) {
    monitorArray.push(`[${locationDir}]=> ${userInput}`, screenOutput);
    $(`#line-${monitorLineTracker}`).text(screenOutput);
    commandExec(cmdEval);
    userInput = '';
  }
}

function clearTheScreen() {
  monitorArray = [];
  monitorLineTracker = 0;
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


function commandExec(userInput) {
  console.log(userInput);
  if (userInput[0] === "POKEDEX") {
    pokedex(userInput[1]);
  }
}

async function pokedex(userInput) {
  console.log('Pokemon Command Fired:', userInput);
  addText(`'You requested and entry on ${userInput}?  Well lets see here.`);
  addText(`This is interesting, I having trouble finding information on ${userInput}`);
  addText(`Oh, yes.  There is no API to go fetch.  That makes sense`);
}

//MAX length of lines to be used is 22.  Will auto append *<SPACE>* to continue

function fullScreenDisplay(dispArray) {
  let pokeEntry = new Pokemon();
  let lineLength = 0;
  dispArray = pokeEntry.entryArray;

  clearTheScreen();
  console.log('FST Enabled');
  console.log(dispArray, dispArray.length);
  isFullScreenEnabled = true;
  console.log('isFullEnabled', isFullScreenEnabled);
  (dispArray.length > 22 ? lineLength = 22 : lineLength = dispArray.length);
  for (let i = 0; i < lineLength; i++) {
    $(`#line-${i}`).text('');
    console.log('i', i);
    $(`#line-${i}`).text(dispArray[i]);
  }
  $(`#line-${22}`).text(`<< Press SPACE to continue >>`);

}

//Events
//text input
$("body").keypress(function (e) {
  let charCode = (e.charCode ? e.charCode : e.which);
  userInputManagement(charCode);
  console.log(charCode);

});
//Non-Text Input
$("body").keydown(function (e) {
  let charCode = (e.charCode ? e.charCode : e.which);
  userInputManagement(charCode, true);
  console.log(charCode);
});

//Execute//

initMonitor();

