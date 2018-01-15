import { connect } from 'react-redux';
import { pickPresent, mapFunctionsToDispatch } from '../../helpers';
import actions from '../../actions';
import FormatForm from './FormatForm';

const mapStateToProps = pickPresent(['reflect', 'format']);

const mapDispatchToProps = mapFunctionsToDispatch({
  setFormat: actions.format.replaceFormat,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FormatForm);
