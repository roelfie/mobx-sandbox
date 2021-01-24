import { sourceCode, moreInfo } from './Doubler_Class.meta.js';

class Doubler_Class {
  value = 1;

  constructor(value) {
    this.value = value;
  }

  get double() {
    return this.value * 2;
  }

  increment = () => this.value++;

  sourceCode = sourceCode;
  moreInfo = moreInfo;
}

export default Doubler_Class;
