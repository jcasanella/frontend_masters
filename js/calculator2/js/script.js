const screenElement = document.querySelector("div.calculator-screen");
const numbers = [];

const digitClicked = (elem, digit) => {
    const screenValue = elem.innerHTML;   
    elem.innerHTML = screenValue === '0' ?  digit : screenValue + digit;
};

const removeClicked = (elem) => {
    const screenValue = elem.innerHTML; 
    if (screenValue !== '0') {
        const value = screenValue.substring(0, screenValue.length - 1);
        elem.innerHTML = value.length === 0 ? '0' : value;    
    }
};

const operatorClicked = (elem, btnValue) => {
    const screenValue = elem.innerHTML; 
    if (screenValue !== '0') {
        numbers.push(screenValue);
        numbers.push(btnValue);
        elem.innerHTML = '0';
    }
};

const calculateOperation = (operation, value, operator) => {
    switch(operation) {
        case 'x':
            return parseInt(value) * operator;
            
        case '+':
            return parseInt(value) + operator;
            
        case '-':
            return parseInt(value) - operator;
            
        case '÷':
            return parseInt(value) / operator;
    }
}

const equalClicked = (elem) => {
    const screenValue = elem.innerHTML; 
    numbers.push(screenValue);

    let operator1;
    let total = 0;
    let operation;
    for (let value of numbers) {
        console.log(`Value: ${value}`);

        if (!isNaN(value)) {    // it's a number
            if (!operator1) {   // so first check if we have collected the first operator
                operator1 = parseInt(value);
                console.log(`Operator1: ${operator1}`);
            } else {    // we got the 2 operators and the operation
                total = calculateOperation(operation, value, operator1);
            }
        } else {    // Get the operation to run
            operation = value;
        }
    }

    console.log(`Numbers: ${total}`);
    elem.innerHTML = total;

    operator1 = undefined;
    operation = undefined;

    numbers.length = 0;
};

const clearClicked = (elem) => elem.innerHTML = '0';

const test = document.querySelector(".buttons");
test.addEventListener("click", function(event) {
    console.log(`Test: ${event.target.innerText}`);
    const btnValue = event.target.innerText;

    if (btnValue === 'C') {
        clearClicked(screenElement);
    } else if (btnValue === '←') {
        removeClicked(screenElement);
    } else if (['÷', 'x', '-', '+'].includes(btnValue)) {
        operatorClicked(screenElement, btnValue);
    } else if (btnValue === '=') {    // equal/assign button
        equalClicked(screenElement);
    } else {              
        digitClicked(screenElement, btnValue);
    }
});
