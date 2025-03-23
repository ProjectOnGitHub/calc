export default class Calc {
  constructor({
                maxNumber = 10,
                isSum = true,
                isDiff = true,
                containerSelector = '.lesson',
                buttonNextSelector = '.form__button--next',
                buttonResultSelector = '.form__button--result',
                fieldResultSelector = '.result',
              }) {
    this.maxNumber = maxNumber;
    this.isSum = isSum;
    this.isDiff = isDiff;
    this.container = document.querySelector(containerSelector);
    this.buttonNext = this.container.querySelector(buttonNextSelector);
    this.buttonResult = this.container.querySelector(buttonResultSelector);
    this.fieldResult = this.container.querySelector(fieldResultSelector);
    this.numbers = Array.from({ length: this.maxNumber }, (_, i) => i + 1);
    this.results = [];
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
    const maxNumber = this.results.length;
    return Math.floor(Math.random() * maxNumber) + 1;
  };

  setEventListeners = () => {
    this.buttonNext.addEventListener('click', this.getRandomNumber);
  };


}
