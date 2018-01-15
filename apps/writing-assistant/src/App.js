import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from './store';
import Topic from './routes/topic';
import SoWhats from './routes/soWhats';
import Reflect from './routes/reflect';
import Reset from './routes/reset';
import Format from './routes/format';
import Back from './routes/back';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Reset />
          <Back />
          <Topic />
          <SoWhats />
          <Reflect />
          <Format />
        </ div>
      </Provider>
    );
  }
}

export default App;
