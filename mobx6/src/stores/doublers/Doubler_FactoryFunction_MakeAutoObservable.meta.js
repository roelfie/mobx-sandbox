export const sourceCode = `const createDoubler = (value) => {
  return makeObservable({
    value, 
    get double() {
      return value * 2
    },
    increment() {
      this.value++;
    }
  })
}`;

export const moreInfo = [
  'Makes existing object properties observable using default annotations',
  'Modifies the object; does not clone it, no proxy involved',
  'Easier to maintain than makeObservable (less boiler plate)',
  '2nd argument are <a href="https://mobx.js.org/observable-state.html#available-annotations" target="_new">overrides</a>',
  '{ myField / myMethod: false } tells MobX not to annotate myField / myMethod',
  '{ myField: observable.shallow }',
  'Dynamically added fields will not be made observable',
  'Recommended API for factory methods (faster than observable())'
];
