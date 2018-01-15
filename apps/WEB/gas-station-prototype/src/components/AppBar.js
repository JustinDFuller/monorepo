import React from 'react';
import { connect } from 'react-redux'
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import { selectOption } from '../actions'
import OptionButtons from './OptionButtons';
import OptionCard from './OptionCard';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/refresh';

const style = {
  marginBottom: 20,
};

const mapStateToProps = state => {
  return {
    option: state.option || { label: "Choose An Option" }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOptionClick: key => {
      dispatch(selectOption(key))
    }
  }
}

const Screen = ({ option, onOptionClick }) => (
  <AppBar
    title={option.label}
    showMenuIconButton={!!option.key}
    style={style}
    iconElementLeft={<IconButton><NavigationClose /></IconButton>}
    onLeftIconButtonTouchTap={() => onOptionClick()}
  />
);

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
