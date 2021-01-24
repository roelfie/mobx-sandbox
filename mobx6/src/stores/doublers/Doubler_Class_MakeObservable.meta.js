export const sourceCode = `class Doubler {
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

export const moreInfo = [
  'Makes existing object properties observable',
  '2nd argument are <a href="https://mobx.js.org/observable-state.html#available-annotations" target="_new">annotations</a>',
  'Annotations can be omitted when using decorators (e.g. @observable)',
  'Dynamically added fields will not be made observable'
];
