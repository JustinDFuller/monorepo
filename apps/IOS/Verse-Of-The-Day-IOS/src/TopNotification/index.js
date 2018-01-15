import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Animated,
} from 'react-native';
import localStyles from './styles';
import styles from './../constants/styles';

export default class TopNotification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: new Animated.Value(0),
      duration: 1000,
    };
    this.onUpdate = key => this.updateState(key).bind(this);
  }

  componentDidMount() {
    Animated.timing(
     this.state.opacity,
      {
        toValue: 1,
      },
   ).start();
  }

  render() {
    return (
      <Animated.View
        style={[
          localStyles.TopNotificationContainer,
          {
            opacity: this.state.opacity,
            backgroundColor: styles[this.props.type],
          },
        ]}
      >
        <Text style={{ color: styles.white, fontWeight: 'bold' }}>{this.props.text}</Text>
      </Animated.View>
    );
  }
}

TopNotification.propTypes = {
  type: PropTypes.oneOf(['primary', 'error']),
  text: PropTypes.string.isRequired,
};

TopNotification.defaultProps = {
  type: 'primary',
};
