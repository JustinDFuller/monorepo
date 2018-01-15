import uuid from 'node-uuid';
import { combineReducers } from 'redux'

function initialState () {
  let state = {
    elements: [],
    selectedElement: {},
  };
  
  try {
    const stateFromStorage = localStorage.getItem('state');
    
    if (stateFromStorage) {
      state = JSON.parse(stateFromStorage);
      console.log('retrieve state', state);
    }
  } catch (e) {
    console.warn('Unable to read localStorage', e);
  }
  
  return state;
}

function createElement (element = {}) {
  return Object.assign({}, {
    key: element.key || uuid.v4(),
    name: element.name || '',
    content: element.content || '',
  });
}

function elementReducer (state = initialState(), action) {
  const key = action.element && action.element.key;
  switch(action.type) {
    case 'ADD_ELEMENT':
      return {
        elements: [
          ...state.elements,
          createElement(action.element)
        ]
      };
    case 'REMOVE_ELEMENT':
      return {
        elements: [
          ...state.elements
        ].splice(getElementIndexByKey(key), 1)
      };
    case 'EDIT_ELEMENT':
      const newElements = [ ...state.elements ];
      newElements.splice(getElementIndexByKey(key), 1, action.element);
      return {
        elements: newElements
      };
    default:
      return {
        elements: [
          ...state.elements
        ]
      };
  }
}

function selectedElementReducer (state = initialState(), action) {
  switch(action.type) {
    case 'SELECT_ELEMENT':
      return {
        selectedElement: action.key
      };
    case 'DESELECT_ELEMENT':
      return {
        selectedElement: action.key
      };
    default:
      return state;
  }
}

function getElementIndexByKey(key) {
  return (e, index) => e.key === key ? index : false;
}

export default combineReducers({
  elementReducer,
  selectedElementReducer
});
