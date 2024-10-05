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
    const validRow = `r${attempts + 1}`;
    const classesElement = elem.className.split(' ');
    if (!classesElement.find((c) => c === validRow)) {
        console.log(`Class: ${elem.className}`);
        return false;
    }

    return true;
};

// Check if Row is fully filled
const isFullRowFilled = () => {
    const maxCell = (attempts + 1) * 5;

    for (let minCell = maxCell - 5 + 1; minCell <= maxCell; minCell++) {
        const cellClass = `c${minCell}`;
        const cellElem = document.querySelector(`.${cellClass}`);

        if (!cellElem.innerText)
            return false;
    }

    return true;
};

// Change Cell Border
const cellAddRedBorder = (addRed) => {
    const maxCell = (attempts + 1) * 5;

    for (let minCell = maxCell - 5 + 1; minCell <= maxCell; minCell++) {
        const cellClass = `c${minCell}`;
        const cellElem = document.querySelector(`.${cellClass}`);

        if (addRed) {
            cellElem.classList.add('cell-red');
        } else {
            cellElem.classList.remove('cell-red');    
        }
    }
};

const isLetter = (letter) => {
    return /^[a-zA-Z]$/.test(letter);
};

// Iterate across the row to build the word
const buildWord = () => {
    const maxCell = (attempts + 1) * 5;
    let word = '';

    for (let minCell = maxCell - 5 + 1; minCell <= maxCell; minCell++) {
        const cellClass = `c${minCell}`;
        const cellElem = document.querySelector(`.${cellClass}`);

        word += cellElem.innerText;
    }

    return word;
};

const compareWords = (response, guessWord) => {
    const result = [];
    const maxCell = (attempts + 1) * 5;
    let minCell = maxCell - 5 + 1;

    for (let idx = 0; idx < guessWord.length; idx++) {
        minCell += idx;
        result.push(response[idx].toUpperCase() === guessWord[idx].toUpperCase());

        if (response[idx].toUpperCase() === guessWord[idx].toUpperCase()) {
            const cellClass = `c${minCell}`;
            const cellElem = document.querySelector(`.${cellClass}`);
            cellElem.classList.add('cell-green');
        }
    }

    return result;
};

// Get a character and validates if it's valid
const enterCharacter = async (elem, event) => {
    console.log(`Event: key ${event.key}`);

    cellAddRedBorder(false);

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
        const rowFilled = isFullRowFilled();
        if (rowFilled) {
            const word = buildWord();
            const response = await fetchData(URL_VALIDATE_WORD, requestInit, word);
            if (response.validWord) {
                const validatedChars = compareWords(word, guessWord.word);
                console.log(`Check which lines are ok ${validatedChars}`);
                attempts++;
            } else {
                cellAddRedBorder(true);
            }
        }
        console.log(`rowFilled: ${rowFilled}`);
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

function Word(word) {
    this.word = word;
}

const requestInit = (word) => {
    return {
        method: 'POST', 
        body: JSON.stringify(new Word(word)),
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
