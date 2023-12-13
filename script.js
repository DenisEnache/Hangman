let wordsList = ["MAJOR", "TIME", "PATIENT", "KINDNESS", "DOCTOR", "LIFE", "SLENDERING", 
    "IMPERSONATION", "ENCOMPASS", "BUTTER", "FOOTBALL", "SIMPLICITY", "MISTERY", "NEGOCIABLE"];

const alphabet = document.getElementById("alphabet");
const wordContainer = document.getElementById("word-container");
const gameStatus = document.getElementById("gameStatus");

let randomWord;
let lifeNr = 7;

function random() {
    const randomPos = Math.floor(Math.random() * wordsList.length);
    randomWord = wordsList[randomPos];
}

random();

function wordLines() {
    for (let i = 0; i < randomWord.length; ++i) {
        let line = document.createElement("span");
        line.textContent = " ";
        line.classList.add("line"); 
        wordContainer.appendChild(line);
    }
}

function replaceLine(index, letter) {
    let lines = document.querySelectorAll(".line");
    for (let i = 0; i < lines.length; ++i) {
        if (index < lines.length) {
            lines[index].textContent = letter;
            lines[index].classList.add("white-line"); 
        }
    }
}

function letterButtons() {
    for(let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); ++i) {
        const letterButton = document.createElement("button");
        letterButton.textContent = String.fromCharCode(i);
        letterButton.classList.add("btn-primary", "btn-lg", "p-3", "m-3");
        letterButton.addEventListener("click", function() {
            checkGuessedLetters(String.fromCharCode(i));
        });
        alphabet.appendChild(letterButton);
    }
}

function checkGuessedLetters(letter) {
    let life = false;
    for (let i = 0; i < randomWord.length && lifeNr > 0; ++i) {
        if (letter == randomWord[i]) {
            life = true;
        }
        if (letter == randomWord[i]) {
            replaceLine(i, letter);
        }
    }
    if (life == false && lifeNr > 0 && gameStatus.textContent == '') {
        --lifeNr;
        document.getElementById("lifeCount").textContent = lifeNr;
    }
    gameStatus.classList.add("game-status");
    if (lifeNr == 0) {
        gameStatus.textContent = "GAME OVER";
    } else if (checkWinner()) {
        gameStatus.textContent = "CONGRATULATIONS!";
    }
}    

function checkWinner() {
    let lines = document.querySelectorAll(".line");
    for (let i = 0; i < lines.length; ++i) {
        if (lines[i].textContent == " ") {
            return false;
        }
    }
    return true;
}

letterButtons();
wordLines();
