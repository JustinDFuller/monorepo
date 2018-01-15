import { connect } from 'react-redux'
import { pickPresent, mapFunctionsToDispatch } from '../../helpers';
import actions from '../../actions';
import SoWhatList from './SoWhatList';

const mapStateToProps = pickPresent(['soWhats']);

const mapDispatchToProps = mapFunctionsToDispatch({
  addSoWhat: actions.soWhat.appendSoWhat,
  editSoWhat: actions.soWhat.updateSoWhatAtIndex,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SoWhatList);
