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

### Note on decorators

[MobX 6](https://michel.codes/blogs/mobx6) recommends against [using decorators](https://www.mobxjs.com/best/decorators.html).

# MobX

### Observable state

There are different way to mark state as [observable](https://mobx.js.org/observable-state.html#observable).

See the [React docs](https://mobx.js.org/observable-state.html) and the _Observable_ examples under the mobx6 app in this project.

- `makeObservable(target, annotations?, options?)`
  - Recommended API for [factory functions](https://medium.com/javascript-scene/javascript-factory-functions-with-es6-4d224591a8b1) and class instances
  - Pro: Fast because no proxy involved
  - Con: Dynamically added properties are not made observable
  - [Private class fields](https://www.sitepoint.com/javascript-private-class-fields/) are not made observable
  - Fields from super or subclasses are not made observable
- `makeAutoObservable(target, overrides?, options?)`
  - Like `makeObservable` but with less boiler plate code. Defaults:
    - functions are annotated with `autoAction`
    - `get` ters are annotated with `computed`
    - fields are marked with `observable`
  - Use when no properties are dynamically added
- `observable(source, overrides?, options?)`
  - Similar to `makeAutoObservable`
  - But makes a clone of the original object
  - Wraps it in a proxy to detect dynamically added properties and mark them as observable
  - Slightly slower (and harder to inspect) than `make(Auto)Observable`

Factory functions vs. constructors on [Stackoverflow](https://stackoverflow.com/questions/8698726/constructor-function-vs-factory-functions).

### Actions

An action is a piece of code that modifies state. It happens in response to an event (button clicked, message arrived, ..).

You can use `makeAutoObservable` or `observable` to automatically mark functions as `action`, or use `makeObservable`.

#### Transactions

Actions are transactional. No observer is updated until the outer-most action has finished.

From the [documentation](https://mobx.js.org/actions.html#wrapping-functions-using-action): _To leverage the transactional nature of MobX as much as possible, actions should be passed as far outward as possible. It is good to mark a class method as an action if it modifies the state. It is even better to mark event handlers as actions, as it is the outer-most transaction that counts. A single unmarked event handler that calls two actions subsequently would still generate two transactions._

So in addition to marking actions on your store as `action` you can also wrap multiple action calls in one outer transaction, as follows:

```js
import { action } from 'mobx';

const ResetButton = ({ formState }) => (
  <button
    onClick={action((e) => {
      formState.resetPendingUploads();
      formState.resetValues();
      e.stopPropagation();
    })}
  >
    Reset form
  </button>
);
```

#### Strict mode

MobX 6 by default does not allow changing state outside of actions. This is called _strict mode_. You can configure this behavior with the [enforceActions](https://mobx.js.org/configuration.html#enforceactions) parameter:

```js
import { configure } from 'mobx';

configure({
  enforceActions: 'never'
});
```

Possible values: `never`, `observed` (default) and `always` (includes state creation).

#### Asynchronous actions

Every step that updates observables in an asynchronous process should be marked as action. When working with promises, there are two ways to accomplish that:

Wrap inline handlers inside actions (ugly):

```js
class Store {
  githubProjects = [];
  state = 'pending'; // "pending", "done" or "error"

  constructor() {
    makeAutoObservable(this);
  }

  fetchProjects() {
    this.githubProjects = [];
    this.state = 'pending';
    fetchGithubProjectsSomehow().then(
      action('fetchSuccess', (projects) => {
        const filteredProjects = somePreprocessing(projects);
        this.githubProjects = filteredProjects;
        this.state = 'done';
      }),
      action('fetchError', (error) => {
        this.state = 'error';
      })
    );
  }
}
```

Or define handlers as seperate actions (much more readable):

```js
class Store {
  githubProjects = [];
  state = 'pending'; // "pending", "done" or "error"

  constructor() {
    makeAutoObservable(this);
  }

  fetchProjects() {
    this.githubProjects = [];
    this.state = 'pending';
    fetchGithubProjectsSomehow().then(this.projectsFetchSuccess, this.projectsFetchFailure);
  }

  projectsFetchSuccess = (projects) => {
    const filteredProjects = somePreprocessing(projects);
    this.githubProjects = filteredProjects;
    this.state = 'done';
  };

  projectsFetchFailure = (error) => {
    this.state = 'error';
  };
}
```

### Computeds

Computed values can be used to derive information from other observables.

- They evaluate lazily
- Their output is cached
- They are only recomputed if underlying observable(s) have changed
- If they are not observed by anything, they suspend entirely
- They should not update state or have other side effects

Computed values help in reducing the amount of state you have to store. They are highly optimized.

Define computed values using [JavaScript getters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get).
Use `makeAutoObservable` or `observable` to automatically declare them as computeds, or use `makeObservable` with the `computed` annotation.

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
