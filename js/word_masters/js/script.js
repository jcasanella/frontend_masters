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

// Initialize all on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeCells();
    hideSpiralAfterTimeout();
    getWordOfDay();
});