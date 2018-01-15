import h from 'virtual-dom/h';
import { Map, List, fromJS } from 'immutable';

/**
 * This is the createElement function that renders JSX -> Object trees.
 * It also makes sure that components receive immutable maps for props
 * And that the children prop is an immutable list.
 * @param {String|function ()} element The tag name for the element OR the component function.
 * @param {Object} attributes The props to be passed to the element as attributes.
 * @returns {Object} The component or jsx compiled to an object tree.
 */
export default (element, attributes = {}, ...children) => {
  /**
   * This is what happens when the element is a component.
   * Properties are turned into a map
   * Children are turned into an immutable list.
   * All of that is passed to the element, which eventually returns JSX
   * And that JSX is returned to this function.
   */
  if (typeof element === 'function') {
    const propertyMap = Map.isMap(attributes) ? attributes : fromJS(attributes || {});
    const childrenList = List.isList(children) ? children : fromJS(children);
    const propsWithChildren = propertyMap.set('children', childrenList);
    return element(propsWithChildren);
  }
  
  /**
   * The default path for non-component elements.
   * Lists are turned into normal arrays.
   */
  const childrenWithoutLists = children.map(child => List.isList(child) ? child.toArray() : child);
  return h(element, attributes, ...childrenWithoutLists);
};
