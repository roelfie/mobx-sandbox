import { makeAutoObservable } from 'mobx';
import { sourceCode, moreInfo } from './Doubler_FactoryFunction_MakeAutoObservable.meta.js';

const createDoubler = (value) => {
  return makeAutoObservable({
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
};

export default createDoubler;
