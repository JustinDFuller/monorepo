import _ from 'lodash';
import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import Results from './Results';

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      categories: [],
      category: 'Video',
      keywords: 'Rick.and.Morty.S03E02',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleKeywordChange = this.handleKeywordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    // const res = await fetch('/categories');
    // const categories = await res.json();
    // this.setState({
    //   categories,
    //   category: _.head(categories),
    // });
    this.handleSubmit();
  }
  
  handleChange (event, index, category) {
    this.setState({category});
  }
  
  handleKeywordChange({ target }) { 
    this.setState({
      keywords: target.value,
    })
  }
  
  async handleSubmit() {
    const res = await fetch(`/search?keyword=${this.state.keywords}&topic=${this.state.category}`);
    const results = await res.json();
    this.setState({
      results,
    });
  }
  
  render() {
    return (
      <div style={{ padding: 20 }}>
        <Card>
          <CardTitle
            title="Search"
            subtitle="Search for a video"
          />
          <CardText>
            <div className="col-xs-12">
              <TextField
                id="text-field-controlled"
                value={this.state.keywords}
                onChange={this.handleKeywordChange}
                hintText="Search Keywords here"
              />
            </div>
          </CardText>
          <CardActions>
            <FlatButton label="Submit" onClick={this.handleSubmit} />
          </CardActions>
        </Card>
        <Results 
          results={this.state.results}
        />
      </div>
    );
  }
}

export default Search;
