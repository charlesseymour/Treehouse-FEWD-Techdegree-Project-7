const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase").querySelector("ul");
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
var tries = document.getElementsByClassName('tries');
var reset = false;

document.querySelector(".btn__reset").addEventListener('click', () => {
  overlay.style.display = "none";
  if (reset) {
    missed = 0;
    while (phrase.hasChildNodes()) {
      phrase.removeChild(phrase.lastChild);
    }
    for (i = 0; i < qwerty.querySelectorAll("BUTTON").length; i++) {
      qwerty.querySelectorAll("BUTTON")[i].classList.remove("chosen");
      qwerty.querySelectorAll("BUTTON")[i].disabled = false;
    }
    var addTries = 5 - tries.length;
    for (i = 0; i < addTries; i++) {
      tryIcon = document.createElement("li");
      tryIcon.classList.add("tries");
      tryIcon.innerHTML = '<img src="images/liveHeart.png" height="35px" width="30px">';
      document.getElementById("scoreboard").firstElementChild.appendChild(tryIcon);
      document.getElementById("scoreboard").firstElementChild.appendChild(document.createTextNode(' '));
    }
  }
  const phraseArray = getRandomPhraseAsArray(phrases);
  addPhraseToDisplay(phraseArray);
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

/*const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);*/

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
    reset = true;
  } else if (missed == 5) {
    overlay.classList.add("lose");
    overlay.getElementsByTagName("H2")[0].innerHTML = "Sorry, you lost";
    overlay.style.display = "flex";
    reset = true;
  }
}

/*qwerty.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    e.target.classList.add("chosen");
    const letterFound = checkLetter(e.target);
    if (letterFound == null) {
      missed += 1;
      tries[tries.length-1].remove();
    }
    checkWin();
  }
})*/

function pressKey(e) {
  if (e.target.tagName === 'BUTTON') {
    e.target.classList.add("chosen");
    e.target.disabled = true;
    const letterFound = checkLetter(e.target);
    if (letterFound == null) {
      missed += 1;
      tries[tries.length-1].remove();
    }
    checkWin();
  }  
}

qwerty.addEventListener('click', pressKey);