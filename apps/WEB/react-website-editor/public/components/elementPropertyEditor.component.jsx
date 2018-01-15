import React, { PropTypes } from 'react';

class ElementPropertyEditor extends React.Component {
  constructor (props) {
    super(props);
    this.createSelectedElementInfo(props);
  }
  
  createSelectedElementInfo (props) {
    this.selectedElementInfo = props.elements.find((e) => e.key === props.selectedElement);
  }
  
  handleChange (event) {
    this.selectedElementInfo[event.target.name] = event.target.value;
    this.props.editElement(this.selectedElementInfo);
  }
  
  componentWillReceiveProps(props) {
    this.createSelectedElementInfo(props);
  }
  
  render () {
    return ( this.selectedElementInfo &&
    <div>
      <h4>Element Properties</h4>
      <label>Tag Name</label>
      <input 
        type='text'
        name='name'
        placeholder='Choose the type of tag to use.'
        value={this.selectedElementInfo.name}
        onChange={this.handleChange.bind(this)} />
      <label>Element Contents</label>
      <input 
        type='text'
        name='content'
        placeholder='Add element contents here.'
        value={this.selectedElementInfo.content}
        onChange={this.handleChange.bind(this)} />
    </div> || <div />
  );
  }
}

export default ElementPropertyEditor;