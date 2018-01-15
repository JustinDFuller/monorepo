# Immutable-Functional-React
React.. with immutable props and functional components. No classes.

## Why?

In React there is an optimization that we can do in the `shouldComponentUpdate` lifecycle hook. It looks something like this:

```js
shouldComponentUpdate(nextProps) {
  // If nextProps and this.props do not have the same
  // Top level props the component will not update.
  // If they are the same it will update.
  return !shallowCompare(nextProps, this.props);
}
```

This is great for many use cases, but if you have nested values this shallowCompare will produce false positives. There are two solutions.

1. Use a deep comparison.
  - This is expensive and could be just as time-wasting as re-rendering. Particularly the times where it returns true - this means you did a deep comparison AND you have to re-render. [This method is not recommended by Facebook.](https://reactjs.org/docs/react-component.html#shouldcomponentupdate)
2. Use Immutable Maps and Lists in your props.
  - This is more expensive than a simple Object and Array but the comparison can be a simple `nextProps !== this.props`. Since the values are immutable nextProps will be a completely new Object when a change is made.
  
[Facebook recommends using immutable objects to speed up comparisons when you have nested objects.](https://reactjs.org/docs/react-api.html#reactpurecomponent)

Manually converting props to Immutable Objects can be annoying, and it's possible to forget. Immutable-Functional-React aims to solve this problem (as well as some others) for you. 

## Immutable Props

```js
/**
 * @param {Immutable.Map} props Props as an immutable Map.
 */
const BasicPropExample = (props) => (
  <div>
    <h1>This is an example of immutable props!</h1>
    <p>Thanks for checking out the docs {props.get('userName')}</p>
    {
     props.get('children') // Children is an Immutable.List
    }
  </div>
);

const App = (
  <BasicPropExample userName="Justin Fuller">
    <h3>I will be rendered in The example above!</h3>
    <p>The cool part is that I will have access to the Immutable.List API. Any changes to me will create a new props object completely, so a simple equality check will show that this component needs to render again.</p>
  </ BasicPropExample>
);

render(App, document.querySelector('#root'));
```

Since `props` is an [Immutable Map](http://facebook.github.io/immutable-js/docs/#/Map) and `children` is an [Immutable List](http://facebook.github.io/immutable-js/docs/#/List) any changes to them will not accidentally mutate props. You also get the performance gain of `nextProps !== this.props` without having to ever implement it in your code (or even wrap it in an HOC). Immutable-Functional-React takes care of all this for you!

## Functional

In order to be called "Functional" Immutable-Functional-React eleminates all usage of Classes. The `this` keyword is not used either. To accomplish this an API similar to [Recompose](https://github.com/acdlite/recompose) is provided.

### State

State is an [Immutable Map](http://facebook.github.io/immutable-js/docs/#/Map) just like props. You can chain as many `withState` Higher Order Components as you'd like. 

Since state is immutable it can be checked just the same as props. `nextState !== currentState` will produce a rerender, even if there are nested values.

```js
import { withState } from 'immutable-functional-react';

const withCounter = withState('counter', 0)

/**
 * @param {Immutable.Map} props Immutable react-like props.
 * @param {Immutable.Map} state Immutable react-like state.
 * @param {function ()} setState A function that expects a new state Map.
 */
const Counter = (props, state, setState) => (
  <div>
    Count: {state.get('counter')}
    <button onClick={() => setState(state.update('counter', n => n + 1))}>Increment</button>
    <button onClick={() => setState(state.update('counter', n => n - 1))}>Decrement</button>
  </div>
);

export default withCounter(Counter);
```
