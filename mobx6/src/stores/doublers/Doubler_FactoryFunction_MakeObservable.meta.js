export const sourceCode = `const createDoubler = (value) => {
  return makeObservable({
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
}`;

export const moreInfo = [
  'Makes existing object properties observable',
  '2nd argument are <a href="https://mobx.js.org/observable-state.html#available-annotations" target="_new">annotations</a>',
  'Dynamically added fields will not be made observable',
  'Recommended API for factory methods (faster than observable())'
];
