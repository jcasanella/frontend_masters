const btnOperations = document.querySelectorAll("button.operator-button");
const btnDigits = document.querySelectorAll("button.standard-button:not(.operator-button)");
const screenElement = document.querySelector("div.calculator-screen");

// Functions to handle the digits
btnDigits.forEach(but => { 
    const digit = but.innerHTML;
    
    switch(digit) {
        case 'C':
            but.addEventListener('click', function() {
                cleanScreen(screenElement);
            });
            break;
        case '←':
            but.addEventListener('click', function() {
                removeDigit(screenElement);
            });
            break;
        default:
            but.addEventListener('click', function() {                
                addDigit(screenElement, digit);
            });
    }
});

const cleanScreen = (elem) => {
    if (elem) {
        elem.innerHTML = '0';
    }
};

const removeDigit = (elem) => {
    if (elem) {
        const screenValue = elem.innerHTML; 
        if (screenValue !== '0') {
            const value = screenValue.substring(0, screenValue.length - 1);
            elem.innerHTML = value.length === 0 ? '0' : value;    
        }
    }
};

const addDigit = (elem, digit) => {
    if (elem) {
        const screenValue = elem.innerHTML;   
        elem.innerHTML = screenValue === '0' ?  digit : screenValue + digit;
    }
};

// Functions to handle the operations
btnOperations.forEach(but => {
    const operator = but.innerHTML;
    // const screenValue = screenElement.innerHTML; 

    switch(operator) {
        case '÷':
            but.addEventListener('click', function() {
                console.log('Divide');
            });
            break;

        case 'x':
            but.addEventListener('click', function() {
                console.log('Product');
            });
            break;

        case '-':
            but.addEventListener('click', function() {
                console.log('Substract');
            });
            break;

        case '+':
            but.addEventListener('click', function() {
                console.log('Add');
            });
            break;
    
        case '=':
            but.addEventListener('click', function() {
                console.log('Assign');
            });
            break;            
    }
});