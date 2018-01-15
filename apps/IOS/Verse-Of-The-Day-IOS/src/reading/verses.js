import React from 'react';
import PropTypes from 'prop-types';
import {
  ScrollView,
  View,
} from 'react-native';
import {
  stateProps,
  statePropDefaults,
} from './../state';
import Verse from './../verse/verse.component';

const Verses = ({ state, onUpdate }) => (
  <ScrollView style={{ flex: 1 }}>
    {
      Array.isArray(state.verses) && state.verses.map((v, index) => (
        <View key={v.title} style={{ flex: 1 }}>
          <Verse
            verse={v}
            state={state}
            onUpdate={onUpdate}
          />
        </View>
      ))
    }
  </ScrollView>
);

Verses.propTypes = {
  state: stateProps,
  onUpdate: PropTypes.func.isRequired,
};

Verses.defaultProps = statePropDefaults;

export default Verses;
