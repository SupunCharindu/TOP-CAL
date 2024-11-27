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



function operate(currentOperator,a,b){
    switch(currentOperator){
        case "+":
            return add(a,b);
        case "-":
            return subtract(a,b);
        case "*":
            return multiply(a,b);
        case "/":
            return divide(a,b);
        default:
            return "Error:Invalid operator." ;   
    }
}


let currentNumber = "";
let previousNumber = null;
let currentOperator = null;

function appendNumber(number) {
  currentNumber += number;
  updateDisplay();
}

function updateDisplay() {
  const display = document.querySelector('.display');
  display.textContent = currentNumber;
}





