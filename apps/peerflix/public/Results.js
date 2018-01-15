import _ from 'lodash';
import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

export class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: ''
    }
  }

  getUrl(body) {
    this.setState({
      url: '',
    }, () => {
      this.setState({
        url: `/play?torrent=${encodeURIComponent(JSON.stringify(body))}`,
      });
    });
  }
  
  render() {
    return (
      <div>
        {
          this.state.url &&
            <video width="400" height="400"  type="video/mp4" autoPlay preload="auto" controls>
              <source src={this.state.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
        }
        {
          _.map(this.props.results, result => (
            <Card key={result.title} style={{ marginTop: 20 }}>
              <CardHeader title={result.title} subtitle={result.time} />
              <CardActions>
                 <RaisedButton label="Play" onClick={() => this.getUrl(result)} />
              </CardActions>
            </Card>
          ))
        }
      </div>
    )
  }
}

export default Results;
