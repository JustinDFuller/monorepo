import { connect } from 'react-redux';
import ElementRenderer from './../components/elementRenderer';
import ElementEditor from './../components/elementEditor';
import ElementPropertyEditor from './../components/elementPropertyEditor.component';
import ElementSelector from './../components/elementSelector.component';
import {
  addElementAction,
  removeElementAction,
  editElementAction,
  selectElementAction,
  deselectElementAction
} from './../actions/elementActions';

function mapStateToProps (state, ownProps) {
  return {
    elements: state.elementReducer.elements,
    selectedElement: state.selectedElementReducer.selectedElement,
  };
}

function mapDispatchToProps (dispatch) {
  return {
    addElement (element) {
      dispatch(addElementAction(element))
    },
    removeElement (element) {
      dispatch(removeElementAction(element))
    },
    editElement (element) {
      dispatch(editElementAction(element))
    },
    selectElement (key) {
      dispatch(selectElementAction(key))
    },
    deselectElement (key) {
      dispatch(deselectElementAction(key))
    },
  }
}

const DisplayElements = connect(
  mapStateToProps
)(ElementRenderer);

const EditElements = connect(
  mapStateToProps,
  mapDispatchToProps
)(ElementEditor);

const EditElementProperties = connect(
  mapStateToProps,
  mapDispatchToProps
)(ElementPropertyEditor);

const SelectElements = connect(
  mapStateToProps,
  mapDispatchToProps
)(ElementSelector);

export {
  DisplayElements, 
  EditElements,
  SelectElements,
  EditElementProperties
};
