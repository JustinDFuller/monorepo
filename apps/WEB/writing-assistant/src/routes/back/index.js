import r from 'ramda';
import { connect } from 'react-redux'
import { ActionCreators } from 'redux-undo';
import { mapFunctionsToDispatch } from '../../helpers';
import BackForm from './BackForm';

const hasPast = r.compose(
  r.prop('length'),
  r.flatten,
  r.map(r.prop('past')),
  r.values,
);

const mapStateToProps = state => ({
  hasPast: hasPast(state),
});

const mapDispatchToProps = mapFunctionsToDispatch({
  goBack: ActionCreators.undo,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BackForm)
