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

    this.currentOperand += number;
  }

  selectOperation(operation) {
    
    if (this.currentOperand) {
      
      if(operation === "=" && this.previousOperand === "") {
        return;
      } else if (this.previousOperand.includes("=")) {
        return;
      }

      this.calculate();
      this.operation = operation;
      this.previousOperand += `${this.currentOperand} ${operation} `;
      if (this.IsfirstCalculation) {
        this.currentOperand = "";
        this.IsfirstCalculation = false;
      } else {
        this.currentOperand = this.currentResult;
        this.displayingResult = true;
      }
    }
  }

  calculate() {
    if (this.currentResult === undefined) {
      this.currentResult = parseFloat(this.currentOperand);
    } else {
      switch (this.operation) {
        case "+":
          this.currentResult =
            this.currentResult + parseFloat(this.currentOperand);
          break;
        case "-":
          this.currentResult =
            this.currentResult - parseFloat(this.currentOperand);
          break;
        case "x":
          this.currentResult =
            this.currentResult * parseFloat(this.currentOperand);
          break;
        case "÷":
          if (parseFloat(this.currentOperand) === 0) {
              this.currentResult = "NaN";
          } else {
            this.currentResult =
              this.currentResult / parseFloat(this.currentOperand); 
          }
        default:
          return;
      }
    }
  }


  updateDisplay() {
    this.currentOperandElement.innerText = this.currentOperand;
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

