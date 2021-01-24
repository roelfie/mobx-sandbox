import { sourceCode, moreInfo } from './Doubler_FactoryFunction.meta.js';

const createDoubler = (value) => ({
  value: value,
  get double() {
    return this.value * 2;
  },
  increment() {
    this.value++;
  },
  sourceCode: sourceCode,
  moreInfo: moreInfo
});

export default createDoubler;
