const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
var missed = 0;

document.querySelector(".btn__reset").addEventListener('click', () => {
  document.getElementById("overlay").style.display = "none";
})
