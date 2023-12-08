var wordsList = ["MAJOR", "TIME", "PATIENT", "KINDNESS", "DOCTOR", "LIFE", "SLENDERING", 
"IMPERSONATION", "ENCOMPASS", "BUTTER", "FOOTBALL", "SIMPLICITY", "MISTERY", "NEGOCIABLE"];

const alphabet = document.getElementById("alphabet");
const wordContainer = document.getElementById("word-container");
const gameStatus = document.getElementById("gameStatus");

let randomWord;
let lifeNr = 7;
let guessedLetNr = 0;

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

function letters() {
    for(let i = 'A'.charCodeAt(0); i <= 'Z'.charCodeAt(0); ++i) {
        const letterButton = document.createElement("button");
        let guessedLetters = [];
        letterButton.textContent = String.fromCharCode(i);
        letterButton.classList.add("btn-primary", "btn-lg", "p-3", "m-3");
        letterButton.addEventListener("click", function() {
            let life = false;
            for (let j = 0; j < randomWord.length && lifeNr > 0; ++j) {
                if (String.fromCharCode(i) == randomWord[j]) {
                    life = true;
                }
                if (String.fromCharCode(i) == randomWord[j] && !guessedLetters.includes(String.fromCharCode(i))) {
                    replaceLine(j, String.fromCharCode(i));
                    ++guessedLetNr;
                    guessedLetters.push(String.fromCharCode(i));
                }
            }
            if (life == false && lifeNr > 0 && guessedLetNr < randomWord.length) {
                --lifeNr;
                document.getElementById("lifeCount").textContent = lifeNr;
            }
            gameStatus.classList.add("game-status");
            if (lifeNr == 0) {
                gameStatus.textContent = "GAME OVER";
            } else if (guessedLetNr == randomWord.length) {
                gameStatus.textContent = "CONGRATULATIONS!";
            }
        });
        alphabet.appendChild(letterButton);
    }
}

letters();
wordLines();
