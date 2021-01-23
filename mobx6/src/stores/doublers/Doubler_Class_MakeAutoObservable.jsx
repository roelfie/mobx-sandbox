import { makeAutoObservable } from 'mobx';

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

  sourceCode = `class Doubler {
  value = 1;

  constructor(value) {
    makeAutoObservable(this);
    this.value = value;
  }

  get double() {
    return this.value * 2;
  }

  increment = () => this.value++;
}`;
}

export default Doubler_Class_MakeAutoObservable;
