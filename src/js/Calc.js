export default class Calc {
  constructor({
                maxNumber = 10,
                isSum = true,
                isDiff = true,
                formSelector = '.js-form',
                fieldExpressionSelector = '.js-form-expression',
                fieldResultSelector = '.js-form-result',
                buttonNextSelector = '.js-button-next',
                buttonResultSelector = '.js-button-result',
                checkboxSelector = '.js-form-input-checkbox',
                numberSelector = '.js-form-input-number',
              }) {
    this.operationsStatus = {
      sum: isSum,
      diff: isDiff,
    };
    this.maxNumber = maxNumber;
    this.form = document.querySelector(formSelector);
    this.fieldExpression = this.form.querySelector(fieldExpressionSelector);
    this.fieldResult = this.form.querySelector(fieldResultSelector);
    this.buttonNext = this.form.querySelector(buttonNextSelector);
    this.buttonResult = this.form.querySelector(buttonResultSelector);
    this.checkboxes = this.form.querySelectorAll(checkboxSelector);
    this.number = this.form.querySelector(numberSelector);
    this.results = [];
    this.usedIndexes = [];
    this.firstNumber = null;
    this.sign = null;
    this.secondNumber = null;
    this.operations = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
    };
    this.setDefaultInputsValue();
    this.setResults();
    this.setEventListeners();
  }

  setResults = () => {
    this.results = [];
    const { sum: isSum, diff: isDiff } = this.operationsStatus;
    const numbers = Array.from({ length: this.maxNumber }, (_, i) => i + 1);
    numbers.forEach((firstNumber) => {
      numbers.forEach((secondNumber) => {
        if (isSum && firstNumber + secondNumber <= this.maxNumber) {
          this.results.push(`${firstNumber}+${secondNumber}`);
        }
        if (isDiff && firstNumber - secondNumber >= 0) {
          this.results.push(`${firstNumber}-${secondNumber}`);
        }
      });
    });
  };

  setDefaultInputsValue = () => {
    [...this.checkboxes].forEach((item) => {
      item.checked = this.operationsStatus[item.value];
    });
    this.number.value = this.maxNumber;
  };

  toggleCheckbox = (event) => {
    const { value, type, checked } = event.target;
    if (type === 'checkbox') {
      this.operationsStatus[value] = checked;
      this.usedIndexes = [];
      this.setResults();
    }
  };

  setInputValue = (event) => {
    const { value, type } = event.target;
    if (type === 'number') {
      this.maxNumber = value;
      this.usedIndexes = [];
      this.setResults();
    }
  };

  getRandomNumber = () => {
    const availableIndexes = this.results
      .map((_, index) => index)
      .filter(index => !this.usedIndexes.includes(index));

    if (availableIndexes.length === 0) {
      this.fieldExpression.textContent = 'Больше примеров нет';
      this.fieldResult.textContent = '';
      this.buttonResult.disabled = true;
      return null;
    }

    const randomIndex = Math.floor(Math.random() * availableIndexes.length);
    const chosenIndex = availableIndexes[randomIndex];

    this.usedIndexes.push(chosenIndex);

    return chosenIndex;
  };

  createExpression = () => {
    const index = this.getRandomNumber();
    if (index === null) return;

    const expression = this.results[index];
    const [firstNumber, sign, secondNumber] = expression.split(/([+\-])/);

    this.firstNumber = parseInt(firstNumber, 10);
    this.sign = sign;
    this.secondNumber = parseInt(secondNumber, 10);
    this.fieldResult.textContent = '';
    this.fieldExpression.textContent = `${this.firstNumber} ${this.sign} ${this.secondNumber} = `;
  };

  viewResult = () => {
    this.fieldResult.textContent = this.operations[this.sign](this.firstNumber, this.secondNumber);
  };

  setEventListeners = () => {
    this.buttonNext.addEventListener('click', this.createExpression);
    this.buttonResult.addEventListener('click', this.viewResult);
    this.form.addEventListener('change', (event) => {
      this.toggleCheckbox(event);
      this.setInputValue(event);
    });
  };
}
