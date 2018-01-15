import { connect } from 'react-redux'
import { pickPresent, mapFunctionsToDispatch} from '../../helpers';
import actions from '../../actions';
import ReflectForm from './ReflectForm';

const mapStateToProps = pickPresent(['reflect', 'soWhats']);

const mapDispatchToProps = mapFunctionsToDispatch({
  setReflect: actions.reflect.replaceReflect,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReflectForm);
