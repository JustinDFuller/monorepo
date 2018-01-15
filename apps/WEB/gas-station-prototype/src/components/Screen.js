import React from 'react';
import { connect } from 'react-redux'
import AppBar from './AppBar';
import OptionCard from './OptionCard';
import OptionButtons from './OptionButtons';

const mapStateToProps = state => {
  return {
    option: state.option || { label: "Choose An Option" }
  }
}

const Screen = ({ option }) => (
  <div>
    <AppBar />
    {
      option.key ?
        <OptionCard />
      :
        <OptionButtons />
    }
  </div>
);

export default connect(mapStateToProps)(Screen);
