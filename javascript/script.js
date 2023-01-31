const inputs = document.querySelector(".inputs"),
hintTag = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
resetBtn = document.querySelector(".reset-btn"),
typingInput = document.querySelector(".typing-input");

let word, maxG, il = [], cl = [];

function randomWord() {
    let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranItem.word;
    maxG = word.length >= 5 ? 8 : 6;
    cl = []; il = [];
    hintTag.innerText = ranItem.hint;
    guessLeft.innerText = maxG;
    wrongLetter.innerText = il;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
        inputs.innerHTML = html;
    }
}
randomWord();

function initGame(e) {
    let key = e.target.value.toLowerCase();
    if(key.match(/^[A-Za-z]+$/) && !il.includes(` ${key}`) && !cl.includes(key)) {
        if(word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if(word[i] == key) {
                    cl += key;
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxG--;
            il.push(` ${key}`);
        }
        guessLeft.innerText = maxG;
        wrongLetter.innerText = il;
    }
    typingInput.value = "";

    setTimeout(() => {
        if(cl.length === word.length) {
            alert(`Cheers! Your Guess is Correct i.e. ${word.toUpperCase()}`);
            return randomWord();
        } else if(maxG < 1) {
            alert("Game over! Reset and Try Again.");
            for(let i = 0; i < word.length; i++) {
                inputs.querySelectorAll("input")[i].value = word[i];
            }
        }
    }, 100);
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());