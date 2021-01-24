import { makeAutoObservable } from 'mobx';
import { sourceCode, moreInfo } from './Doubler_Class_MakeAutoObservable.meta.js';

class Doubler_Class_MakeAutoObservable {
  value = 1;

  constructor(value) {
    makeAutoObservable(this);
    this.value = value;
  }

  get double() {
    return this.value * 2;
  }

  increment() {
    return this.value++;
  }

  sourceCode = sourceCode;
  moreInfo = moreInfo;
}

export default Doubler_Class_MakeAutoObservable;
