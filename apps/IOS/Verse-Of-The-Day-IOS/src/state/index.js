import PropTypes from 'prop-types';
import defaultVerses from './../constants/verses';

const defaultState = {
  selectedTab: 'read',
  loading: true,
  verses: defaultVerses,
  readFullText: null,
  bibleVersion: '',
  bibleVersions: [],
  notifications: {
    date: new Date(),
    allowed: false,
    interval: 'day',
  },
  fontSize: 18,
  selectedSetting: '',
  bibleVersionSearch: '',
};

const {
  string,
  bool,
  arrayOf,
  shape,
  instanceOf,
  number,
} = PropTypes;

const VersesType = shape({
  theme: string.isRequired,
  title: string.isRequired,
  text: string,
  fullText: string,
  reference: string.isRequired,
});

const BibleVersionType = shape({
  id: string.isRequired,
  name: string.isRequired,
});

const stateProps = shape({
  bibleVersion: string.isRequired,
  selectedTab: string.isRequired,
  loading: bool.isRequired,
  verses: arrayOf(VersesType).isRequired,
  readFullText: VersesType,
  bibleVersions: arrayOf(BibleVersionType).isRequired,
  notifications: shape({
    allowed: bool.isRequired,
    date: instanceOf(Date),
    interval: string.isRequired,
  }).isRequired,
  fontSize: number.isRequired,
  selectedSetting: string.isRequired,
  bibleVersionSearch: string.isRequired,
}).isRequired;

const statePropDefaults = {
  readFullText: null,
};

export {
  defaultState,
  stateProps,
  statePropDefaults,
  VersesType,
  BibleVersionType,
};
