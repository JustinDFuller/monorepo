import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
} from 'react-native';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';

const colors = [
  '#eee',
  '#ccc',
  '#eee',
];

const PlaceHolder = ({ rows }) => {
  const rowArray = [];
  const row = (key, last) => (
    <View
      style={{
        height: last ? 18 : 10,
        width: last ? 120 : undefined,
        alignSelf: last ? 'flex-end' : undefined,
        backgroundColor: 'white',
        zIndex: 999,
        marginTop: last ? -17 : undefined,
      }}
      key={key}
    />
  );

  for (let i = 0; i <= rows; i++) {
    rowArray.push(row(i, i === rows));
  }

  return (
    <View style={{ height: 100, marginBottom: 10, position: 'relative', justifyContent: 'space-between' }}>
      {
        rowArray
      }
      <AnimatedLinearGradient
        customColors={colors}
        speed={600}
      />
    </View>);
};

PlaceHolder.propTypes = {
  rows: PropTypes.number,
};

PlaceHolder.defaultProps = {
  rows: 4,
};

export default PlaceHolder;
