function addElementAction (element) {
  return {
    type: 'ADD_ELEMENT',
    element,
  };
}

function removeElementAction (element) {
  return {
    type: 'REMOVE_ELEMENT',
    element,
  };
}

function editElementAction (element) {
  return {
    type: 'EDIT_ELEMENT',
    element,
  };
}

function selectElementAction (key) {
  return {
    type: 'SELECT_ELEMENT',
    key,
  };
}

function deselectElementAction (key) {
  return {
    type: 'DESELECT_ELEMENT',
    key,
  };
}

export {
  addElementAction,
  removeElementAction,
  editElementAction,
  selectElementAction,
  deselectElementAction
};
