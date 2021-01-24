import { action, computed, makeObservable, observable } from 'mobx';
import { sourceCode, moreInfo } from './Doubler_Class_MakeObservable.meta.js';

class Doubler_Class_MakeObservable {
  value = 1;

  constructor(value) {
    makeObservable(this, {
      value: observable,
      double: computed,
      increment: action
    });
    this.value = value;
  }

  get double() {
    return this.value * 2;
  }

  increment = () => this.value++;

  sourceCode = sourceCode;
  moreInfo = moreInfo;
}

export default Doubler_Class_MakeObservable;
