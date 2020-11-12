class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clearAll();
  }

  clearAll() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.currentResult = undefined;
    this.operation = undefined;
    this.displayingResult = false;
    this.isFirstCalculation = true;
  }

  clear() {
    if (
      this.currentOperand === undefined ||
      this.currentOperand === this.currentResult
    ) {
      return;
    }

    this.currentOperand = this.currentOperand.substring(
      0,
      this.currentOperand.length - 1
    );

    if (this.currentOperand === "") {
      this.currentOperand = "0";
    }
  }

  appendNumber(number) {
    if (this.previousOperand.includes("=")) {
      return;
    }
    if (this.displayingResult) {
      this.currentOperand = "";
      this.displayingResult = false;
    }
    if (number === "." && this.currentOperand.includes(".")) {
      return;
    }

    if (this.currentOperand === "0") {
      this.currentOperand = "";
    }

    if (number === "." && this.currentOperand === "") {
      this.currentOperand = "0.";
    } else {
      this.currentOperand += number;
    }
  }

  selectOperation(operation) {
    if (this.currentOperand) {
      if (operation === "=" && this.previousOperand === "") {
        return;
      } else if (this.previousOperand.includes("=")) {
        return;
      }

      this.calculate();
      this.operation = operation;
      this.previousOperand += `${this.currentOperandElement.innerText} ${operation} `;
      if (this.isFirstCalculation) {
        this.currentOperand = "";
        this.isFirstCalculation = false;
      } else {
        this.currentOperand = this.currentResult;
        this.displayingResult = true;
      }

      if (operation === "=") {
        console.log(this.currentResult)
      }
    }
  }

  reverseSign() {
    if (parseFloat(this.currentOperand) > 0) {
      this.currentOperand = parseFloat(this.currentOperand) * -1;
      this.currentOperand = this.currentOperand.toString();
    } else if (this.currentOperand.includes("-")) {
      this.currentOperand = this.currentOperand.substring(1);
    }
  }

  calculate() {
    if (this.currentResult === undefined) {
      this.currentResult = parseFloat(this.currentOperand);
    } else {
      let currentCalculation = parseFloat(this.currentOperand);
      switch (this.operation) {
        case "+":
          this.currentResult = this.currentResult + currentCalculation;
          break;
        case "-":
          this.currentResult = this.currentResult - currentCalculation;
          break;
        case "x":
          this.currentResult = this.currentResult * currentCalculation;
          break;
        case "÷":
          if (currentCalculation === 0) {
            this.currentResult = "NaN";
          } else {
            this.currentResult = this.currentResult / currentCalculation;
          }
          break;
        default:
          return;
      }
    }
  }

  formatDisplay(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let intergerDisplay;
    if (isNaN(integerDigits)) {
      intergerDisplay = "";
    } else {
      intergerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${intergerDisplay}.${decimalDigits}`;
    } else {
      return intergerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandElement.innerText = this.formatDisplay(this.currentOperand);
    this.previousOperandElement.innerText = this.previousOperand;
  }
}

const numButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const plusMinusButton = document.querySelector("[data-negative-positive]");
const clearButton = document.querySelector("[data-clear-last]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperand = document.querySelector("[data-previous-operand]");
const currentOperand = document.querySelector("[data-current-operand]");

const calc = new Calculator(previousOperand, currentOperand);

numButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calc.appendNumber(button.innerText);
    calc.updateDisplay();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calc.selectOperation(button.innerText);
    calc.updateDisplay();
  });
});

allClearButton.addEventListener("click", () => {
  calc.clearAll();
  calc.updateDisplay();
});

clearButton.addEventListener("click", () => {
  calc.clear();
  calc.updateDisplay();
});

plusMinusButton.addEventListener("click", () => {
  calc.reverseSign();
  calc.updateDisplay();
});

document.addEventListener("keydown", (event) => {
  const KEYS = ["1", "2","3", "4", "5", "6", "7", "8", "9", "0", ".", "+", "-", "*", "/", "=", "Enter", "Backspace", "Delete"];
  const key = event.key;
  if (!KEYS.includes(event.key)) {
    return;
  } else {
    if (key === "Backspace") {
      calc.clear();
      calc.updateDisplay();
    } else if (key === "Delete") {
      calc.clearAll();
      calc.updateDisplay();
    } else if (key === "Enter" || key === "=") {
      event.preventDefault();
      calc.selectOperation("=");
      calc.updateDisplay();
    } else if (key === "/") {
      calc.selectOperation("÷");
      calc.updateDisplay();
    } else if (key === "*" || key === "X" || key === "x") {
      calc.selectOperation("x");
      calc.updateDisplay();
    } else if (key === "+") {
      calc.selectOperation("+");
      calc.updateDisplay();
    } else if (key === "-") {
      calc.selectOperation("-");
      calc.updateDisplay();
    } else {
      calc.appendNumber(event.key);
      calc.updateDisplay();
    } 
  }
});
