import React, { PropTypes } from 'react';

const ElementSelector = ({ elements, selectElement, selectedElement }) => {
  return (
    <select value={selectedElement} 
            onChange={(e = {}) => selectElement(e.target.value)}>
      <option>Select an element</option>
      {
        elements && elements.map((element) => {
          return (
            <option key={element.key} 
                    value={element.key}>
              {element.name || 'Element not named'}
            </option>
          )
        })
      }
    </select>
  );
};


export default ElementSelector;