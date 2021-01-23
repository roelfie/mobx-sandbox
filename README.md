# mobx-sandbox

# References

- [mobx.js.org](https://mobx.js.org/README.html)
  - [API Reference](https://mobx.js.org/api.html)
- [npmjs.com](https://www.npmjs.com/package/mobx)
- [github](https://github.com/mobxjs/awesome-mobx#awesome-mobx)
- Courses
  - [Egghead.io](https://egghead.io/courses/manage-complex-state-in-react-apps-with-mobx) (MobX 3)
  - [Egghead.io](https://egghead.io/courses/develop-react-applications-with-mobx-and-typescript) (Basarat Ali Syed)
  - [Udemy](https://www.udemy.com/course/mobx-in-depth-with-react/)
- Youtube
  - [MobX, or: Going from Mutable to Immutable to Reactive State Management](https://www.youtube.com/watch?v=ZHxFrbK3VB0&feature=emb_logo)
  - [Introduction to MobX & React in 2020](https://www.youtube.com/watch?v=pnhIJA64ByY)
  - Maksim Ivanov
    - [How To Use React With MobX And Hooks - Note Taking App Tutorial](https://www.youtube.com/watch?v=MKNls_FReXI)
    - [Fetch Data With Mobx Note Taking App Using React Mobx and Typescript](https://www.youtube.com/watch?v=1fgRc1lYIEU)
    - [Battlefield Developer Tells The Secrets of MobX Nested Stores](https://www.youtube.com/watch?v=WoT6iPY75FU)
    - [Making Food Ordering App - MobX vs Redux Comparison](https://www.youtube.com/watch?v=uFWrquw5aHA)
    - [THE ULTIMATE REACT-HOOK-FORM CHALLENGE - ALL FEATURES IN ONE FORM](https://www.youtube.com/watch?v=U-iz8b4RExA)
- [Codesandbox](https://codesandbox.io/examples/package/mobx-react) examples

See also the MobX 6 cheat sheet

- [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter#readme)

# Introduction

- [Ten minute introduction to MobX and React](https://mobx.js.org/getting-started)
- [UI as an Afterthought](https://michel.codes/blogs/ui-as-an-afterthought)
- [How to decouple state and UI](https://hackernoon.com/how-to-decouple-state-and-ui-a-k-a-you-dont-need-componentwillmount-cc90b787aa37)

### Basic terminology

- **state**
- **derivations** are functions that return a computed value based on the state (from a simple number to a complex GUI)
- **reactions** are similar to derivations: they perform a task but don't return a value
- **actions** alter the state

Actions change state, and MobX ensures that these changes are automatically processed by all derivations and reactions.

# MobX

### Observable state

#### `makeObservable(target, annotations?, options?)`

Use in class constructors:

```js
import { makeObservable, observable, computed, action } from 'mobx';

class Doubler {
  value;

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

  increment() {
    this.value++;
  }
}
```

The second argument maps annotations (observable, computed, action) to class members.

- only supports properties that are already defined (make sure your compiler configuration is correct, or that a value is assigned to all properties before using makeObservable)
- cannot annotate properties from sub- or superclasses (call `makeObservable()` for such properties explicitly)
- JavaScript private fields are not supported

#### `makeAutoObservable(target, overrides?, options?)`

Used with [factory functions](https://medium.com/javascript-scene/javascript-factory-functions-with-es6-4d224591a8b1):

```js
import { makeAutoObservable } from 'mobx';

function createDoubler(value) {
  return makeAutoObservable({
    value,
    get double() {
      return this.value * 2;
    },
    increment() {
      this.value++;
    }
  });
}
```

#### `observable(source, overrides?, options?)`

See examples. Does not work for classes or factory functions?

--> observable wraps the object in a proxy (to allow adding dynamic properties) so is slightly slower than make(Auto)Observable.

https://mobx.js.org/observable-state.html#observable

Documentation: Class instances will never be made observable automatically by passing them to observable or assigning them to an observable property. Making class members observable is considered the responsibility of the class constructor.

The primary difference between make(Auto)Observable and observable is that the first one modifies the object you are passing in as first argument, while observable creates a clone that is made observable.

The second difference is that observable creates a Proxy object, to be able to trap future property additions in case you use the object as a dynamic lookup map. If the object you want to make observable has a regular structure where all members are known up-front, we recommend to use makeObservable as non proxied objects are a little faster, and they are easier to inspect in the debugger and console.log.

Because of that, make(Auto)Observable is the recommended API to use in factory functions. Note that it is possible to pass { proxy: false } as an option to observable to get a non proxied clone.

#### TODO

How to use the following:

- observable
  - observable.ref
  - observable.shallow
- action
- computed
- autorun
- flow
- makeObservable
- makeAutoObservable

Factory functions vs. constructors on [Stackoverflow](https://stackoverflow.com/questions/8698726/constructor-function-vs-factory-functions).

MobX strict mode? Doesn't allow changing state other than through actions?

# React and MobX

- observer: basically wraps a React component in `autorun`
- \<Observer\>

https://github.com/mobxjs/mobx/issues/101

### `mobx-react-lite` vs. `mobx-react`

Do not use [mobx-react-lite](https://www.npmjs.com/package/mobx-react-lite). It is slightly faster than mobx-react, but it does not support class components and lacks some other features as well.

https://mobx.js.org/react-integration.html

### Passing stores to React components

https://github.com/mobxjs/mobx/issues/300

In general there are three ways in which you can pass stores in MobX

1. Explicitly via props. Easy to test and clear to follow, but can become clumpsy when you have deeply nested structures or many stores (you can solve the latter by having a store for stores)
2. Import stores in the components directly and just use them :) It's the MVP of passing stores around, but stand alone testing of components becomes tricky quickly as you have to make sure your global stores are in the right state first
3. Pass stores around via React's context mechanism. Redux's Provider uses that, as does the mobx-connect package. Context is passed implicitly and deep component can extract data out of the context, but it is still easy to test as you only have to make sure you set up some context before testing the component.

# React and MobX with Hooks

# Decorators

[MobX 6](https://michel.codes/blogs/mobx6) recommends against [using decorators](https://www.mobxjs.com/best/decorators.html).
