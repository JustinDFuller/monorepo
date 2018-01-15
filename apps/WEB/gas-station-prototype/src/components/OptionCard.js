import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import { connect } from 'react-redux'
import { swipeCard } from '../actions'
import FlatButton from 'material-ui/FlatButton';

const mapStateToProps = state => ({
  option: state.option
});

const mapDispatchToProps = dispatch => {
  return {
    onSwipe: key => {
      dispatch(swipeCard(key))
    }
  }
}

const OptionCard = ({ onSwipe, option }) => (
  <Card>
    <CardHeader
      title="Swipe Card Now"
    />
    <div className="swipe-animation">
      <div className="credit-card">
        <div className="scc-tripe"></div>
      </div>
      <div className="swiper-top"></div>
      <div className="swiper-bottom">
        <div className="light-indicator"></div>
      </div>
    </div>
    <CardActions>
      <FlatButton label="Simulate Card Swipe" onClick={() => onSwipe('Simulated')} />
    </CardActions>
  </Card>
);

export default connect(mapStateToProps, mapDispatchToProps)(OptionCard);
