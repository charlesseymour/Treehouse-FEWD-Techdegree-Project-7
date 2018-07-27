const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
const phrases = [
  "keep your eyes peeled",
  "under the weather",
  "knock your socks off",
  "drawing a blank",
  "what goes up must come down"
]
const letters = document.getElementsByClassName("letter");
const overlay = document.getElementById("overlay");
var missed = 0;

document.querySelector(".btn__reset").addEventListener('click', () => {
  overlay.style.display = "none";
})

function getRandomPhraseAsArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)].split("");
}

function addPhraseToDisplay(arr) {
  arr.forEach(function(element){
    const li = document.createElement('li');
    li.textContent = element;
    phrase.appendChild(li);
    if (element != " ") {
      li.classList.add("letter");  
    }
  })
}

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

function checkLetter(btn) {
  var letter = null;
  for (i = 0; i < letters.length; i++) {
    if (letters[i].textContent == btn.textContent) {
      letters[i].classList.add("show");
      letter = btn.textContent;
    } 
  }
  return letter;
}

function checkWin() {
  var shownLetters = document.getElementsByClassName("show");
  if (shownLetters.length == letters.length) {
    overlay.classList.add("win");
    overlay.getElementsByTagName("H2")[0].innerHTML = "You won!";
    overlay.style.display = "flex";
  } else if (missed == 5) {
    overlay.classList.add("lose");
    overlay.getElementsByTagName("H2")[0].innerHTML = "Sorry, you lost";
    overlay.style.display = "flex";
  }
}

qwerty.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    e.target.classList.add("chosen");
    const letterFound = checkLetter(e.target);
    if (letterFound == null) {
      missed += 1;
      var tries = document.getElementsByClassName('tries');
      tries[tries.length-1].remove();
    }
    checkWin();
  }
})



