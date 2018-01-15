import React from 'react';
import ReactDOM from 'react-dom';
import {
  DisplayElements, 
  EditElements
} from './containers/elements.container';
import reducer from './reducers/elementReducers';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import 'normalize.css';
import './style';

const store = createStore(reducer);

store.subscribe(() => {
  saveState(store.getState());
});

class Editor extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render () {
    return (
      <Provider store={store}>
        <div>
          <EditElements />
          <DisplayElements />
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(
  <Editor />,
  document.getElementById('root')
);

function saveState (state) {
  console.log('savestate', state);
  try {
    localStorage.getItem('state', {
      elements: state.elementReducer.elements,
      selectedElement: state.selectedElementReducer.selectedElement,
    });
  } catch (e) {
    console.warn('Unable to write localStorage', e);
  }
}