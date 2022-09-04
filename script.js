const calculator = document.querySelector('.row');
const buttons = calculator.querySelector('.keys');
const display = calculator.querySelector('.screen');

buttons.addEventListener('click', e => {
    const button = e.target;    
    const action = button.dataset.action;
    const buttonContent = button.textContent;
    const displayedNum = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;

    let firstValue = calculator.dataset.firstValue;
    const operator = calculator.dataset.operator;
    let secondValue = displayedNum;

    Array.from(button.parentNode.children).forEach(b => b.classList.remove('is-pressed'));

    if (!action) {
        if (displayedNum === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
            display.textContent = buttonContent;
        }
        else {
            display.textContent = displayedNum + buttonContent;
        }
        calculator.dataset.previousKeyType = 'number';
    }

    if (action === 'add' || action === 'substract' || action === 'multiply' || action === 'divide') {
        if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
            const interimValue = calculate(firstValue, operator, secondValue);
            display.textContent = interimValue;
            calculator.dataset.firstValue = interimValue;
        }
        else {
            calculator.dataset.firstValue = displayedNum;
        }
        button.classList.add('is-pressed');        
        calculator.dataset.previousKeyType = 'operator';
        calculator.dataset.operator = action;
    }

    switch (action) {
        case "clearAll":
            display.textContent = 0;
            calculator.dataset.firstValue = '';
            calculator.dataset.modifiedValue = '';
            calculator.dataset.operator = '';
            calculator.dataset.previousKeyType = '';
            break;
        case "clearCurrent":
            display.textContent = 0;
            break;
        case "back":
            display.textContent = displayedNum.substring(0, displayedNum.length - 1);
            break;
        case "plusMinus":
            display.textContent *= -1;
            break;
        case "sqrt":
            display.textContent = Math.sqrt(displayedNum);
            calculator.dataset.previousKeyType = 'calculate';
            break;
        case "inverse":
            display.textContent = 1 / displayedNum;
            calculator.dataset.previousKeyType = 'calculate';
            break;
        case "factorial":
            display.textContent = calculateFactorial(displayedNum);
            calculator.dataset.previousKeyType = 'calculate';
            break;
        case "pi":
            display.textContent = Math.PI;                       
            break;
        case "decimal":
            if (!displayedNum.includes('.') && previousKeyType === 'number') {
                display.textContent = displayedNum + '.';
            }
            else if (previousKeyType === 'operator' || previousKeyType === 'calculate' || previousKeyType != 'number') {
                display.textContent = '0.';
                calculator.dataset.previousKeyType = 'decimal';
            }
            break;
        case "percentage":
            if (firstValue) {
                if (previousKeyType === 'percentage') {
                    firstValue = displayedNum;
                    secondValue = calculator.dataset.modifiedValue;
                }
                display.textContent = calculatePercentage(firstValue, operator, secondValue)
            }
            calculator.dataset.modifiedValue = secondValue;   
            calculator.dataset.previousKeyType = 'calculate';         
            break;
        case "calculate":
            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayedNum;
                    secondValue = calculator.dataset.modifiedValue;
                }
                display.textContent = calculate(firstValue, operator, secondValue)
            }
            calculator.dataset.modifiedValue = secondValue;
            calculator.dataset.previousKeyType = 'calculate';
    }
});

const calculate = (n1, operator, n2) => {
    const firstNum = parseFloat(n1);
    const secondNum = parseFloat(n2);

    if (operator === 'add') return firstNum + secondNum;
    if (operator === 'substract') return firstNum - secondNum;
    if (operator === 'multiply') return firstNum * secondNum;
    if (operator === 'divide') return firstNum / secondNum;
}

const calculatePercentage = (n1, operator, n2) => {
    const firstNum = parseFloat(n1);
    const secondNum = (parseFloat(n2) / 100);

    if (operator === 'add') return firstNum + (firstNum * secondNum);
    if (operator === 'substract') return firstNum - (firstNum * secondNum);
    if (operator === 'multiply') return firstNum * secondNum;
    if (operator === 'divide') return firstNum / secondNum;
}

function calculateFactorial(n) {
    if (n === 1)
        return 1;
    else
        return n * calculateFactorial(n - 1);
}
