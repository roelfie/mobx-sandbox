export const sourceCode = `class Doubler_Class {
  value = 1;

  constructor(value) {
    this.value = value;
  }

  get double() {
    return this.value * 2;
  }

  increment = () => this.value++;
}

import { observable } from 'mobx';
import Doubler form './Doubler';

const doubler = observable(new Doubler(2));

// Disable proxy (to improve performance):
//const doubler = observable(new Doubler(2), {}, { proxy: false });
`;

export const moreInfo = [
  'Does not work with class instances!',
  'Use make(Auto)Observable() to make a class instance observable'
];
