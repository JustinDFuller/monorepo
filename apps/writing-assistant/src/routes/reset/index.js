import { connect } from 'react-redux'
import { reset } from '../../actions/reset';
import ResetForm from './ResetForm';
import  { mapFunctionsToDispatch } from '../../helpers';

const mapStateToProps = () => ({});

const mapDispatchToProps = mapFunctionsToDispatch({
  reset,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetForm);
