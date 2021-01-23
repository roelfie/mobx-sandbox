const createDoubler = (value) => ({
  value: value,
  get double() {
    return this.value * 2;
  },
  increment() {
    this.value++;
  },
  sourceCode: `const createDoubler = (value) => ({
  value: value,
  get double() {
    return this.value * 2;
  },
  increment() {
    this.value++;
  }
});`
});

export default createDoubler;
