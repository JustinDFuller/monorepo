import React from 'react';
import ReactDOM from 'react-dom';
import {
  SelectElements,
  EditElementProperties
} from './../containers/elements.container';

const ElementEditor = ({ selectedElement, addElement }) => {
  return (
  <form className='editor'>
    <h2>Element Editor</h2>
    <SelectElements />
    <EditElementProperties />
    <button type='button' onClick={() => addElement()}>Add Element</button>
  </form>
)
};
        
export default ElementEditor;