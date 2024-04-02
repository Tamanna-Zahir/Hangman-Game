var input = document.querySelector("#input");
var checkBtn = document.querySelector("#check");
var previousGuesses = document.querySelector("#previousGuesses");
var wrongInput =  document.querySelector("#wrongInput");
var resetBtn =  document.querySelector("#resetBtn");
var result = document.querySelector("#result");
var key = document.querySelector("#word");
var gif = document.getElementById('gif');
resetBtn.style.display = "none"; // this will hide the reset button 
let answer = "";
// pickword();
let maxGuesses = 6;
let missed = 0;
let guessedLetter = [];
let currWord = null;
pickword();
guessedWord();
clickCounter();

document.querySelector("#check").addEventListener("click", start);
function start(){
  let guess = input.value;
  if(guess.length > 1){
    wrongInput.innerHTML = "Invalid Input! Please Enter characters only";
    wrongInput.style.color ="red";
    input.value = "";
    
  }else{
    wrongInput.innerHTML ="";
    input.value = "";
    checkGuess(guess);
  }
}

function checkGuess(guessLetter){
  if(guessedLetter.indexOf(guessLetter) === -1){
    guessedLetter.push(guessLetter);
  }
  if(answer.indexOf(guessLetter) >= 0){
    guessedWord();
    checkGame();
  }else{
    if(answer.indexOf(guessLetter) === -1){
      missed++;
      document.querySelector("#missed").innerHTML = missed;
      previousGuesses.innerHTML += guessLetter + " " ; 
      checkGame();
      updateImage();
    }
  }
}
function guessedWord() {
 currWord = "";
  for (var i = 0; i < answer.length; i++) {
    var letter = answer[i];
    if (guessedLetter.indexOf(letter) >= 0) {
      currWord += letter;
    } else {
      currWord += " _ ";
    }
  }
 key.innerHTML = currWord;
}
function updateImage(){
  document.querySelector("#image").src = './images/img' + missed + '.svg';
}
function checkGame(){
  if(currWord === answer){
    key.innerHTML = "The fruit was: " + answer;
    result.innerHTML = 'You Won!!!';
    result.style.color ="green";
    gif.src = './images/victory.gif';
    gif.style.display = "inline"; // Ensure GIF is visible
    input.disabled = true;
    checkBtn.disabled = true;
    resetBtn.style.display = "inline";
   resetBtn.addEventListener("click", reset);  
  }
  else if(missed === maxGuesses) {
    key.innerHTML = "The fruit was: " + answer;
    result.innerHTML = 'You Lost!!!';
    result.style.color ="red";
     gif.src = './images/lost.gif'; // Set GIF for losing
      gif.style.display = "inline"; // Show the GIF    input.disabled = true;
    checkBtn.disabled = true;
    resetBtn.style.display = "inline";
    resetBtn.addEventListener("click", reset); 
  

  }
}
function reset(){

  input.disabled = false;
  checkBtn.disabled = false;
  maxGuesses = 6;
  missed = 0;
  guessedLetter = [];
  currWord = null;
  resetBtn.style.display = "none"; // this will hide the reset button 
  input.innerHTML= "";
  previousGuesses.innerHTML = "Previous Wrong Guesses: ";
  wrongInput.innerHTML= "";
  key.innerHTML ="";
  result.innerHTML= "";
  document.querySelector("#missed").innerHTML = missed;
  gif.style.display = "none"
  pickword();
  guessedWord();
  updateImage();
  clickCounter();
}

function pickword(){
  var fruitsNames = [
  "apple",
  "banana",
  "orange",
  "strawberry",
  "blueberry",
  "grape",
  "mango",
  "pineapple",
  "watermelon",
  "peach",
  "cherry",
  "pear",
  "kiwi",
  "lemon",
  "lime",
  "raspberry",
  "blackberry",
  "papaya",
  "apricot",
  "plum",
  "fig",
  "guava",
  "pomegranate",
  "cranberry",
  "avocado",
  "lychee",
  "tangerine",
  "cantaloupe"
]
   answer = fruitsNames[Math.floor(Math.random() * fruitsNames.length)];
  // answer ="test";
}

function clickCounter() {
  if (localStorage.clickcount) {
    localStorage.clickcount = Number(localStorage.clickcount)+1;
  } else {
    localStorage.clickcount = 1;
  }
  document.getElementById("demo").innerHTML = localStorage.clickcount;
}