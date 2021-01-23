import { action, computed, makeObservable, observable } from 'mobx';

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
      sourceCode: `const createDoubler = (value) => {
  return makeAutoObservable({
    value, 
    get double() {
      return value * 2
    },
    increment() {
      this.value++;
    }
  },
  {
    value: observable,
    double: computed,
    increment: action
  })
}`
    },
    {
      value: observable,
      double: computed,
      increment: action
    }
  );
};

export default createDoubler;
