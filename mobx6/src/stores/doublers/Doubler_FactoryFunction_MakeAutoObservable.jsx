import { makeAutoObservable } from 'mobx';

const createDoubler = (value) => {
  return makeAutoObservable({
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
  })
}`
  });
};

export default createDoubler;
