/** @flow */

import Colors from '../../colors';
import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.WhiteTransparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default style;