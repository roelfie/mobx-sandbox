export const sourceCode = `const createDoubler = (value) => ({
  value: value,
  get double() {
    return this.value * 2;
  },
  increment() {
    this.value++;
  }
});

import { observable } from 'mobx';
import createDoubler form './Doubler';

const doubler = observable(createDoubler(2));

// Disable proxy (to improve performance):
//const doubler = observable(createDoubler(2), {}, { proxy: false });
`;

export const moreInfo = [
  'Makes all members observable, similar to makeAutoObservable()',
  'Uses a proxy by default, making dynamically added properties observable too',
  'Because of proxy: worse performance and harder to inspect',
  'Proxy can be disabled',
  'Recommended API for arrays, maps, sets and dynamically keyed objects'
];
