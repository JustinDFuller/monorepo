import React, { Component } from 'react';
import { Card, CardActions, CardTitle } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import './App.css';

class App extends Component {
  handleClick() {
    this.fileInput.click();
  }

  handleChange({ target }) {
    const file = target.value;
    console.log(file);
  }

  render() {
    return (
      <div className="padding">
        <input
          type="file"
          ref={(input) => { this.fileInput = input; }}
          onChange={this.handleChange}
          className="hide"
        />
        <Card>
          <CardTitle title="Manage Node Projects" subtitle="Choose your project here" />
          <CardActions>
            <RaisedButton label="Choose Project" primary onClick={() => this.handleClick()} />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default App;
