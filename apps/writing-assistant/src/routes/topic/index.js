import r from 'ramda';
import { connect } from 'react-redux'
import actions from '../../actions';
import { pickPresent, getValue, mapFunctionsToDispatch } from '../../helpers';
import TopicForm from './TopicForm';

const mapStateToProps = pickPresent(['topic', 'soWhats']);

const mapDispatchToProps = mapFunctionsToDispatch({
  setTopic: r.compose(
    actions.topic.replaceTopic,
    getValue,
  ),
  addSoWhat: r.compose(
    actions.soWhat.appendSoWhat,
    getValue,
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TopicForm);
