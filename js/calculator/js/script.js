const screenElement = document.querySelector("div.calculator-screen");

const numbers = [];

const addDigit = (elem, digit) => {
    const screenValue = elem.innerHTML;   
    elem.innerHTML = screenValue === '0' ?  digit : screenValue + digit;
};

const removeDigit = (elem) => {
    const screenValue = elem.innerHTML; 
    if (screenValue !== '0') {
        const value = screenValue.substring(0, screenValue.length - 1);
        elem.innerHTML = value.length === 0 ? '0' : value;    
    }
};

const test = document.querySelector(".buttons");
test.addEventListener("click", function(event) {
    console.log(`Test: ${event.target.innerText}`);
    const btnValue = event.target.innerText;

    if (btnValue === 'C') {
        screenElement.innerHTML = '0';
    } else if (btnValue === '←') {
        removeDigit(screenElement);
    } else if (['÷', 'x', '-', '+'].includes(btnValue)) {
        const screenValue = screenElement.innerHTML; 

        if (screenValue !== '0') {
            numbers.push(screenValue);
            numbers.push(btnValue);
            screenElement.innerHTML = '0';
        }
    } else if (btnValue === '='){    // equal/assign button
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
    } else {              
        addDigit(screenElement, btnValue);
    }
});
