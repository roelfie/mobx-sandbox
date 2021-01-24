export const sourceCode = `class Doubler {
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

export const moreInfo = [
  'Makes existing object properties observable using default annotations',
  'Modifies the object; does not clone it, no proxy involved',
  'Easier to maintain than makeObservable (less boiler plate)',
  '2nd argument are <a href="https://mobx.js.org/observable-state.html#available-annotations" target="_new">overrides</a>',
  '{ myField / myMethod: false } tells MobX not to annotate myField / myMethod',
  '{ myField: observable.shallow }',
  'Can not be used on classes with super or subclasses',
  "Class methods are annotated with 'autoAction' (can act as action and derivation)",
  'Dynamically added fields will not be made observable'
];
