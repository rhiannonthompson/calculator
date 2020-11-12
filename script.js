class Calculator {
  constructor(previousOperandElement, currentOperandElement) {
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.displayingResult = false;
    this.IsfirstCalculation = true;
    this.clearAll();
  }

  clearAll() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.currentResult = undefined;
    this.operation = undefined;
    this.displayingResult = false;
    this.IsfirstCalculation = true;
  }

  clear() {
    if (this.currentOperand != typeof "string") {
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
      if (this.IsfirstCalculation) {
        this.currentOperand = "";
        this.IsfirstCalculation = false;
      } else {
        this.currentOperand = this.currentResult;
        this.displayingResult = true;
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
        default:
          return;
      }
    }
  }

  
  cleanDisplay(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let intergerDisplay;
    if (isNaN(integerDigits)) {
      intergerDisplay = "";
    } else {
      intergerDisplay= integerDigits.toLocaleString("en", {maximumFractionDigits: 0 });
    }

    if (decimalDigits != null) {
      return `${intergerDisplay}.${decimalDigits}`;
    } else {
      return intergerDisplay;
    }
  }

  updateDisplay() {
    this.currentOperandElement.innerText = this.cleanDisplay(this.currentOperand);
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
