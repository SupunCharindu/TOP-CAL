// Function to add two numbers
function add(a, b) {
    return a + b;
}

// Function to subtract two numbers
function subtract(a, b) {
    return a - b;
}

// Function to multiply two numbers
function multiply(a, b) {
    return a * b;
}

// Function to divide two numbers
function divide(a, b) {
    if (b === 0) {
        return "Error: Division by zero is not allowed.";
    }
    return a / b;
}



function operate(operator,num1,num2){
    switch(operator){
        case "+":
            return add(num1,num2);
        case "-":
            return subtract(num1,num2);
        case "*":
            return multiply(num1,num2);
        case "/":
            return divide(num1,num2);
        default:
            return "Error:Invalid operator." ;   
    }
}


const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const deleteButton = document.querySelector('.back-space');
const clearButton = document.querySelector('.clear');
const pointButton = document.querySelector('.decimal');
const equalsButton = document.querySelector('.equals');
const display = document.getElementById('display');
document.addEventListener('keydown', handleKeyboardInput);

let firstNumber = '';
let secondNumber = '';
let currentOperator = '';
let shouldResetScreen = false;

display.textContent = '0';

numberButtons.forEach((button) =>
    button.addEventListener('click', () => appendNumber(button.textContent))
);

operatorButtons.forEach((button) =>
    button.addEventListener('click', () => setOperation(button.textContent))
);

equalsButton.addEventListener('click', evaluate);
clearButton.addEventListener('click', clear);
deleteButton.addEventListener('click', deleteNumber);
pointButton.addEventListener('click', appendPoint);

function isDisplayLimitReached() {
    return display.textContent.length >= 16;
}

function appendNumber(number) {
    if (shouldResetScreen) resetScreen(); // Clear the screen for new input
    if (display.textContent === '0') {
        display.textContent = ''; // Remove leading zero
    }
    if (isDisplayLimitReached()) return; // Stop if display is at limit
    display.textContent += number;
}

function resetScreen() {
    display.textContent = '';
    shouldResetScreen = false;
}

function clear() {
    display.textContent = '0';
    firstNumber = '';
    secondNumber = '';
    currentOperator = '';
}

function deleteNumber() {
    display.textContent = display.textContent.toString().slice(0, -1);
    if (display.textContent === '') display.textContent = '0';
}

function appendPoint() {
    if (isDisplayLimitReached() || display.textContent.includes('.')) return;
    display.textContent += '.';
}

function setOperation(operator) {
    if (currentOperator !== '') evaluate();
    firstNumber = display.textContent;
    currentOperator = operator;
    shouldResetScreen = true;
}

function evaluate() {
    if (!currentOperator || shouldResetScreen) return; // No operator selected
    if (!firstNumber || isNaN(firstNumber)) return; // Invalid first number
    if (!display.textContent || isNaN(display.textContent)) return; // Invalid second number

    secondNumber = display.textContent;
    let result = operate(
        currentOperator,
        parseFloat(firstNumber),
        parseFloat(secondNumber)
    );

    // Limit result to 10 characters, and handle scientific notation if necessary
    if (result.toString().length > 10) {
        result = parseFloat(result.toPrecision(10));
    }

    display.textContent = result;
    currentOperator = '';
    firstNumber = result; // Allow chaining calculations
    shouldResetScreen = true; // Set flag to clear screen for new input
}


function handleKeyboardInput(e) {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
    if (e.key === '.') appendPoint()
    if (e.key === '=' || e.key === 'Enter') evaluate()
    if (e.key === 'Backspace') deleteNumber()
    if (e.key === 'c') clear()
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
      setOperation(convertOperator(e.key))
  }
  function convertOperator(keyboardOperator) {
    if (keyboardOperator === '/') return '÷'
    if (keyboardOperator === '*') return '×'
    if (keyboardOperator === '-') return '−'
    if (keyboardOperator === '+') return '+'
  }