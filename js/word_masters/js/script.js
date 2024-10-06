// global variables
let attempts = 0;

// URL constants
const URL_VALIDATE_WORD = 'https://words.dev-apis.com/validate-word';
const URL_WORD_OF_THE_DAY = 'https://words.dev-apis.com/word-of-the-day';

let guessWord;

// Fetch data, the URL to connect
const fetchData = async (url, requestInitFn, params) => {
    try {
        const requestInit = (typeof requestInitFn === 'function') ? requestInitFn(params) : {};
        const response = await fetch(url, requestInit);
        if (!response.ok) {
            throw Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(`Response: ${JSON.stringify(json)}`);

        return json;
    } catch(error) {
        console.error(error.message);
    }
};

// Check if the cell focus is in a valid row
const isValidRow = (elem) => {
    const validRow = `r${attempts}`;
    const classNames = elem.classList;
    return classNames.values().some((c) => c === validRow);
};

// Check if Row is fully filled
const isFullRowFilled = () => {
    const cellClass = `r${attempts}`;
    const cells = document.querySelectorAll(`.${cellClass}`);

    const c = [...cells].reduce((acc, curValue) => curValue.innerText ? 
        { isFull: acc.isFull && true, word: acc.word + curValue.innerText} : { isFull: false, word: null}, 
        { isFull: true, word: ''});

    return c;
};

// Change Cell Border
const rowAddRedBorder = (addRed) => {
    const cellClass = `r${attempts}`;
    const rowElems = document.querySelectorAll(`.${cellClass}`);
    [...rowElems].forEach((c) => addRed ? c.classList.add('cell-red') : c.classList.remove('cell-red'));
};

const isLetter = (letter) => {
    return /^[a-zA-Z]$/.test(letter);
};

// Compare words and apply cell style depending matches
const compareWords = (response, guessWord) => {
    const responseWordUpper = response.toUpperCase();
    const guessWordUpper = guessWord.toUpperCase();

    const row = `r${attempts}`;
    const cells = document.querySelectorAll(`.${row}`);
    const arrayCells = [...cells];

    for (let idx = 0; idx < guessWordUpper.length; idx++) {
        if (responseWordUpper[idx] === guessWordUpper[idx]) {
            arrayCells[idx].classList.add('cell-green');
        } else if (guessWordUpper.includes(responseWordUpper[idx])) {
            arrayCells[idx].classList.add('cell-yellow');
        } else {
            arrayCells[idx].classList.add('cell-grey');
        }
    }

    return responseWordUpper !== guessWordUpper;
};

// Get a character and validates if it's valid
const enterCharacter = async (elem, event) => {
    console.log(`Event: key ${event.key}`);

    rowAddRedBorder(false);

    // If not valid row, dont allow to edit
    if (!isValidRow(elem)) {
        return;
    }

    const charac = event.key;
    if(charac === 'Backspace') {
        elem.innerText = '';
    } else if(isLetter(charac)) {
        elem.innerText = event.key;
    } else if(charac === 'Enter') {
        const { isFull, word } = isFullRowFilled();
        console.log(`rowFilled: ${isFull} word: ${word}`);
        if (isFull) {
            const response = await fetchData(URL_VALIDATE_WORD, requestInit, word);
            if (response.validWord) {
                const validatedChars = compareWords(word, guessWord.word);
                console.log(`Check which lines are ok ${validatedChars}`);

                const dialog = document.querySelector(".dialog-wrapper");
                dialog.style.display = "block";

                // const mainScreen = document.querySelector(".wrapper");
                // mainScreen.style.display = "none";

                attempts++;
            } else {
                rowAddRedBorder(true);
            }
        }
    } else {
        event.preventDefault();
    }    
};

// Initialize cells
const initializeCells = () => {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => {
        cell.setAttribute('tabindex', '0');
        cell.addEventListener("keydown", (evt) => enterCharacter(cell, evt));
    });
};

// Delay function
const delay = (time) =>  new Promise(resolve => setTimeout(resolve, time));

// Hide Spiral After 5 Seconds
const hideSpiralAfterTimeout = () => {
    setTimeout(() => {
        const elemSpiral = document.querySelector(".wrapper_spiral");
        elemSpiral.style.display = 'none';
    }, 5000);
};

const requestInit = (word) => {
    return {
        method: 'POST', 
        body: JSON.stringify({ word: `${word}` }),
        headers: {
            "Content-Type": "application/json",
        }
    };
};

// Initialize all on page load
document.addEventListener('DOMContentLoaded', async () => {
    initializeCells();
    hideSpiralAfterTimeout();

    guessWord = await fetchData(URL_WORD_OF_THE_DAY);
});
