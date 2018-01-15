import React, { Component } from 'react';
import {
  AdMobBanner,
} from 'react-native-admob';

class Ad extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
    };
    this.$showAd = this.showAd.bind(this);
  }

  showAd() {
    this.setState({ height: 80 });
  }

  render() {
    return (
      <AdMobBanner
        bannerSize="smartBannerPortrait"
        adUnitID="ca-app-pub-3940256099942544/2934735716"
        style={{ height: this.state.height }}
        adViewDidReceiveAd={this.$showAd}
      />
    );
  }
}

export default Ad;
