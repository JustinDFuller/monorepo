import test from 'ava';
import { Map, List } from 'immutable';
import ImmutableReact from '../../index';

/**
 * Tests in this file are based around converting
 * JSX and Components -> Object trees.
 */

test('It turns jsx into a dom object', (t) => {
  const jsx = <div>Hello World!</div>;
  t.true(typeof jsx === 'object');
  t.true(jsx.tagName === 'DIV');
  t.truthy(jsx.children.length);
  t.true(jsx.children[0].text === 'Hello World!');
});

test('It includes attributes that are passed to the jsx', (t) => {
  const jsx = <div foo="foo" bar={5} object={{ baz: true }} />;
  t.true(jsx.properties.foo === 'foo');
  t.true(jsx.properties.bar === 5);
  t.true(jsx.properties.object.baz === true);
});

test('It includes children object', (t) => {
  const jsx = (
    <div>
      <span>
        <h1 test="test">Children</h1>
      </span>
    </div>
  );
  t.true(jsx.children[0].children[0].children[0].text === 'Children');
  t.true(jsx.children[0].children[0].properties.test === 'test');
});

test('It passes props to a component as an immutable map', (t) => {
  t.plan(2);
  const ValidatingPropsIsMap = props => {
    t.true(Map.isMap(props));
    t.is(props.get('name'), 'ImmutableReact');
    
    return  (
      <div>
        {
          props.get('name') || 'Default name'
        }
      </div>
    );
  };
  const jsx = <ValidatingPropsIsMap name="ImmutableReact" />;
});

test('It passes children to a component as an immutable list', (t) => {
  t.plan(10); // to make sure the assertions in the component are run.
  const ValidatingChildrenIsList = props => {
    const children = props.get('children');
    t.true(List.isList(children));
    t.is(children.size, 2);
    
    return (
      <div>
        {
          children
        }
      </div>
    );
  };
  const jsx = (
    <ValidatingChildrenIsList>
      <h1>Hello Children Attribute!</h1>
      <p>Each children prop should be an immutable list.</p>
    </ValidatingChildrenIsList>
  );
  
  t.is(jsx.tagName, 'DIV');
  t.is(jsx.children.length, 2);
  t.is(jsx.children[0].tagName, 'H1');
  t.is(jsx.children[0].children.length, 1);
  t.is(jsx.children[0].children[0].text, 'Hello Children Attribute!');
  t.is(jsx.children[1].tagName, 'P');
  t.is(jsx.children[1].children.length, 1);
  t.is(jsx.children[1].children[0].text, 'Each children prop should be an immutable list.');
});
