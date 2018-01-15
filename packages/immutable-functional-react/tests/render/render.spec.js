import test from 'ava';
import ImmutableReact, { render } from '../../index';
import createElement from 'virtual-dom/create-element';

test('It renders a tree into a parent element', (t) => {
  t.plan(1);

  const tree = (<div>
    <span>Hello</span>
    <p>World!</p>
  </div>);

  const element = {
    appendChild(child) {
      t.deepEqual(child, createElement(tree));
    },
  };
  
  render(tree, element);
});
