export default class Calc {
  constructor({
                maxNumber = 2,
                isSum = true,
                isDiff = true,
                formSelector = '.js-form',
                fieldExpressionSelector = '.js-form-expression',
                fieldResultSelector = '.js-form-result',
                buttonNextSelector = '.js-button-next',
                buttonResultSelector = '.js-button-result',
                checkboxSelector = '.js-form-input-checkbox',
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
    this.numbers = Array.from({ length: this.maxNumber }, (_, i) => i + 1);
    this.results = [];
    this.usedIndexes = [];
    this.firstNumber = null;
    this.sign = null;
    this.secondNumber = null;
    this.operations = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
    };
    this.setDefaultCheckboxValue();
    this.setResults();
    this.setEventListeners();
  }

  setResults = () => {
    const { sum: isSum, diff: isDiff } = this.operationsStatus;

    this.numbers.forEach((firstNumber) => {
      this.numbers.forEach((secondNumber) => {
        if (isSum && firstNumber + secondNumber <= this.maxNumber) {
          this.results.push(`${firstNumber}+${secondNumber}`);
        }
        if (isDiff && firstNumber - secondNumber >= 0) {
          this.results.push(`${firstNumber}-${secondNumber}`);
        }
      });
    });
  };

  setDefaultCheckboxValue = () => {
    [...this.checkboxes].forEach((item)=> {
      item.checked = this.operationsStatus[item.value];
    });
  };

  toggleCheckbox = (event) => {
    const { value, type, checked } = event.target;
    if (type === 'checkbox') {
      this.operationsStatus[value] = checked;
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
    });
  };
}
