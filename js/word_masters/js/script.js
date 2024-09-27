// Get a character and validates if it's valid
const enterCharacter = (elem, event) => {
    console.log(`Event: key ${event.key}`);

    const isLetter = (letter) => {
        return /^[a-zA-Z]$/.test(letter);
    };

    const charac = event.key;
    if(charac === 'Backspace') {
        elem.innerText = '';
    } else if(isLetter(charac)) {
        elem.innerText = event.key;
    } else {
        console.log(`No valid charac`);
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

// Initialize all on page load
document.addEventListener('DOMContentLoaded', () => {
    initializeCells();
    hideSpiralAfterTimeout();
});