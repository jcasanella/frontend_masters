const btnOperations = document.querySelectorAll("button.operator-button");
const btnDigits = document.querySelectorAll("button.standard-button:not(.operator-button)");
const screenElement = document.querySelector("div.calculator-screen");

const test = document.querySelector(".buttons");
test.addEventListener("click", function(event) {
    console.log(`Test: ${event.target.innerText}`)
});

const numbers = [];

// Functions to handle the digits
btnDigits.forEach(but => { 
    const digit = but.innerHTML;
    
    if (digit === 'C') {
        but.addEventListener('click', function() {
            screenElement.innerHTML = '0';
        });
    } else if (digit === '←') {
        but.addEventListener('click', function() {
            removeDigit(screenElement);
        });
    } else {
        but.addEventListener('click', function() {                
            addDigit(screenElement, digit);
        });
    }
});

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

    if (['÷', 'x', '-', '+'].includes(operator)) {
        but.addEventListener('click', function() {
            const screenValue = screenElement.innerHTML; 

            if (screenValue !== '0') {
                numbers.push(screenValue);
                numbers.push(operator);
                screenElement.innerHTML = '0';
            }
        });
    } else {    // equal/assign button
        but.addEventListener('click', function() {
            const screenValue = screenElement.innerHTML; 
            numbers.push(screenValue);

            let operator1;
            let total = 0;
            let operation;
            for (let value of numbers) {
                console.log(`Value: ${value}`);

                if (!isNaN(value)) {
                    if (!operator1) {
                        operator1 = parseInt(value);
                        console.log(`Operator1: ${operator1}`);
                    }

                    switch(operation) {
                        case 'x':
                            total = parseInt(value) * operator1;
                            break;
                        case '+':
                            total = parseInt(value) + operator1;
                            break;
                        case '-':
                            total = parseInt(value) - operator1;
                            break;
                        case '÷':
                            total = parseInt(value) / operator1;
                            break;
                    }
                } else {
                    operation = value;
                }
            }
            console.log(`Numbers: ${total}`);
            screenElement.innerHTML = total;

            operator1 = undefined;
            operation = undefined;

            numbers.length = 0;
        });
    }
});