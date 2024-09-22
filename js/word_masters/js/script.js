function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

function enterCharacter(elem, event) {
    console.log(`Event: key ${event.key}`);

    const charac = event.key;
    if(charac === 'Backspace') {
        elem.innerText = '';
    } else if(isLetter(charac)) {
        elem.innerText = event.key;
    } else {
        console.log(`No valid charac`);
    }    
}

const cells = document.querySelectorAll(".cell");
cells.forEach((cell) => {
    cell.setAttribute('tabindex', '0');

    cell.addEventListener("keydown", (evt) => enterCharacter(cell, evt));
});
