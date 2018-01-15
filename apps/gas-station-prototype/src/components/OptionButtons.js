import React from 'react';
import options from '../option-list';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux'
import { selectOption } from '../actions'

const style = {
  marginBottom: 20,
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    onOptionClick: key => {
      dispatch(selectOption(key))
    }
  }
}

const OptionButtons = ({ onOptionClick }) => (
  <div>
      {
        options.map(o => (
          <RaisedButton
            key={o.key}
            label={o.label}
            fullWidth={true}
            style={style}
            onClick={() => onOptionClick(o.key)}
          />
        ))
      }
    </div>
);

export default connect(mapStateToProps, mapDispatchToProps)(OptionButtons);
