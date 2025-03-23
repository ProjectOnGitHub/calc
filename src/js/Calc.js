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
              }) {
    this.maxNumber = maxNumber;
    this.isSum = isSum;
    this.isDiff = isDiff;
    this.form = document.querySelector(formSelector);
    this.fieldExpression = this.form.querySelector(fieldExpressionSelector);
    this.fieldResult = this.form.querySelector(fieldResultSelector);
    this.buttonNext = this.form.querySelector(buttonNextSelector);
    this.buttonResult = this.form.querySelector(buttonResultSelector);
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
    this.setResults();
    this.setEventListeners();
  }

  setResults = () => {
    this.numbers.forEach((firstNumber) => {
      this.numbers.forEach((secondNumber) => {
        if (this.isSum && firstNumber + secondNumber <= this.maxNumber) {
          this.results.push(`${firstNumber}+${secondNumber}`);
        }
        if (this.isDiff && firstNumber - secondNumber >= 0) {
          this.results.push(`${firstNumber}-${secondNumber}`);
        }
      });
    });
  };

  getRandomNumber = () => {
    const availableIndexes = this.results
      .map((_, index) => index)
      .filter(index => !this.usedIndexes.includes(index));

    if (availableIndexes.length === 0) {
      this.fieldResult.textContent = 'Больше примеров нет';
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
  };
}
