import { action, computed, makeObservable, observable } from 'mobx';
import { sourceCode, moreInfo } from './Doubler_FactoryFunction_MakeObservable.meta.js';

const createDoubler = (value) => {
  return makeObservable(
    {
      value: value,
      get double() {
        return this.value * 2;
      },
      increment() {
        this.value++;
      },
      sourceCode: sourceCode,
      moreInfo: moreInfo
    },
    {
      value: observable,
      double: computed,
      increment: action
    }
  );
};

export default createDoubler;
