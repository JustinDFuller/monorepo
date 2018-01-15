import React, { Component } from 'react';
import { View, PanResponder } from 'react-native';
import PropTypes from 'prop-types';

const swipeDirections = {
  SWIPE_UP: 'SWIPE_UP',
  SWIPE_DOWN: 'SWIPE_DOWN',
  SWIPE_LEFT: 'SWIPE_LEFT',
  SWIPE_RIGHT: 'SWIPE_RIGHT',
};

const swipeConfig = {
  velocityThreshold: 0.3,
  directionalOffsetThreshold: 80,
};

function isValidSwipe(velocity, velocityThreshold, directionalOffset, directionalOffsetThreshold) {
  return Math.abs(velocity) > velocityThreshold &&
         Math.abs(directionalOffset) < directionalOffsetThreshold;
}

function localhandleShouldSetPanResponder(evt) {
  return evt.nativeEvent.touches.length === 1;
}

class GestureRecognizer extends Component {

  constructor(props, context) {
    super(props, context);
    this.swipeConfig = swipeConfig;
  }

  componentWillMount() {
    const responderEnd = this.localhandlePanResponderEnd.bind(this);
    const shouldSetResponder = localhandleShouldSetPanResponder.bind(this);
    this.localpanResponder = PanResponder.create({ // stop JS beautify collapse
      onStartShouldSetPanResponder: shouldSetResponder,
      onMoveShouldSetPanResponder: shouldSetResponder,
      onPanResponderRelease: responderEnd,
      onPanResponderTerminate: responderEnd,
    });
  }

  localhandlePanResponderEnd(evt, gestureState) {
    const swipeDirection = this.localgetSwipeDirection(gestureState);
    this.localtriggerSwipeHandlers(swipeDirection, gestureState);
  }

  localtriggerSwipeHandlers(swipeDirection, gestureState) {
    const { onSwipe, onSwipeUp, onSwipeDown, onSwipeLeft, onSwipeRight } = this.props;
    const { SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP, SWIPE_DOWN } = swipeDirections;
    switch (swipeDirection) {
      case SWIPE_LEFT:
        return onSwipeLeft && onSwipeLeft(gestureState);
      case SWIPE_RIGHT:
        return onSwipeRight && onSwipeRight(gestureState);
      case SWIPE_UP:
        return onSwipeUp && onSwipeUp(gestureState);
      case SWIPE_DOWN:
        return onSwipeDown && onSwipeDown(gestureState);
      default:
        return onSwipe && onSwipe(swipeDirection, gestureState);
    }
  }

  localgetSwipeDirection(gestureState) {
    const { SWIPE_LEFT, SWIPE_RIGHT, SWIPE_UP, SWIPE_DOWN } = swipeDirections;
    const { dx, dy } = gestureState;
    if (this.localisValidHorizontalSwipe(gestureState)) {
      return (dx > 0)
        ? SWIPE_RIGHT
        : SWIPE_LEFT;
    } else if (this.localisValidVerticalSwipe(gestureState)) {
      return (dy > 0)
        ? SWIPE_DOWN
        : SWIPE_UP;
    }
    return null;
  }

  localisValidHorizontalSwipe(gestureState) {
    const { vx, dy } = gestureState;
    const { velocityThreshold, directionalOffsetThreshold } = this.swipeConfig;
    return isValidSwipe(vx, velocityThreshold, dy, directionalOffsetThreshold);
  }

  localisValidVerticalSwipe(gestureState) {
    const { vy, dx } = gestureState;
    const { velocityThreshold, directionalOffsetThreshold } = this.swipeConfig;
    return isValidSwipe(vy, velocityThreshold, dx, directionalOffsetThreshold);
  }

  render() {
    return (<View {...this.props} {...this.localpanResponder.panHandlers} />);
  }
}

GestureRecognizer.propTypes = {
  onSwipe: PropTypes.func,
  onSwipeUp: PropTypes.func,
  onSwipeDown: PropTypes.func,
  onSwipeLeft: PropTypes.func,
  onSwipeRight: PropTypes.func,
};
GestureRecognizer.defaultProps = {
  onSwipe: null,
  onSwipeUp: null,
  onSwipeDown: null,
  onSwipeLeft: null,
  onSwipeRight: null,
};

export default GestureRecognizer;
