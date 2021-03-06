/**
 * @flow
 * */

import { StyleSheet } from 'react-native';
import Colors from '../../colors';

type CreditsStyle = {
  container: Object,
  frame: Object,
  separator: Object,
};

const style: CreditsStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    flexDirection: 'column',
    minHeight: 450,
  },
  frame: { marginTop: -StyleSheet.hairlineWidth },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.EpamBlue,
  },
});

export default style;
