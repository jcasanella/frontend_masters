// global variables
let attempts = 0;

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

const isLetter = (letter) => {
    return /^[a-zA-Z]$/.test(letter);
};

// Get a character and validates if it's valid
const enterCharacter = (elem, event) => {
    console.log(`Event: key ${event.key}`);

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
            attempts++;
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

// Get word of the day
const  getWordOfDay = async () => {
    const url = 'https://words.dev-apis.com/word-of-the-day';
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(`Response: ${JSON.stringify(json)}`);

        const { word } = json;
        console.log(`Word: ${word}`);
    } catch(error) {
        console.error(error.message);
    }
};

// Check if it's a valid word
const isValidWord = async (word) => {
    const url = 'https://words.dev-apis.com/validate-word';
    try {
        const response = await fetch(url, { 
            method: 'POST', 
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!response.ok) {
            throw Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        console.log(`Response: ${JSON.stringify(json)}`);
    } catch(error) {
        console.error(error.message);
    }
};

// Initialize all on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeCells();
    hideSpiralAfterTimeout();
    getWordOfDay();
});