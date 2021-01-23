class Doubler_Class {
  value = 1;
  sourceCode = 'abc';
  constructor(value) {
    this.value = value;
  }

  get double() {
    return this.value * 2;
  }

  increment = () => this.value++;

  sourceCode2 = `class Doubler_Class {
  value = 1;

  constructor(value) {
    this.value = value;
  }

  get double() {
    return this.value * 2;
  }

  increment = () => this.value++;
}`;
}

export default Doubler_Class;
