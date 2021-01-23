import { action, computed, makeObservable, observable } from 'mobx';

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

  sourceCode = `class Doubler {
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
}`;
}

export default Doubler_Class_MakeObservable;
