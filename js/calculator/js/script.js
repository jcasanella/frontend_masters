const btnOperations = document.querySelectorAll("button.operator-button");

btnOperations.forEach(but => { console.log(but.innerHTML) });

const btnDigits = document.querySelectorAll("button.standard-button:not(.operator-button)");
const screenElement = document.querySelector("div.calculator-screen");

btnDigits.forEach(but => { 
    const digit = but.innerHTML;
    
    but.addEventListener('click', function() {
        const screenValue = screenElement.innerHTML;   
                
        if (digit === 'C') { 
            cleanScreen(screenElement);
        } else if(digit === '←') {   // Remove last digit
            removeDigit(screenElement, screenValue);
        } else {
            screenElement.innerHTML = screenValue === '0' ?  digit : screenValue + digit;
        }
    });
});

const cleanScreen = (elem) => {
    if (elem) {
        elem.innerHTML = '0';
    }
};

const removeDigit = (elem, screenValue) => {
    if (elem) {
        if (screenValue !== '0') {
            const value = screenValue.substring(0, screenValue.length - 1);
            elem.innerHTML = value.length === 0 ? '0' : value;    
        }
    }
};