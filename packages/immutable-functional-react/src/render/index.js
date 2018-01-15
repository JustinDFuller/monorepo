import createElement from 'virtual-dom/create-element';

export default (tree, parent) => parent.appendChild(createElement(tree));
