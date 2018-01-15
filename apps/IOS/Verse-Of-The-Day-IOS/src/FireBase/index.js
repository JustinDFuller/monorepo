import Firestack from 'react-native-firestack';

const configurationOptions = {
  // debug: __DEV__,
};
const firestack = new Firestack(configurationOptions);

console.log(firestack);

const methods = {
  analyticsEvent(event, context) {
    firestack.analytics.logEventWithName(event, context)
    .then(res => console.log('FireStack analytics', res))
    .catch(err => console.error(err));
  },
};

export default methods;
