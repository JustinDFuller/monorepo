import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Screen from './components/Screen';
import reducers from './reducers';

const store = createStore(reducers);

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider>
      <Screen />
    </MuiThemeProvider>
  </Provider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
