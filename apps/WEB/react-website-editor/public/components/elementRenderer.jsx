import React, { PropTypes } from 'react';

const ElementRenderer = ({ elements }) => (
  <div>
    {
      elements && elements.map((element) => {
        return (element.name && element.key &&
          <element.name key={element.key}>
            {element.content}
          </element.name>
        )
      })
    }
  </div>
);

export default ElementRenderer;