/**
 * @flow
 * */

import { StyleSheet, Platform } from 'react-native';
import Colors from '../../colors';

const style = StyleSheet.create({
  header: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: Colors.EpamBlue,
  },
  header_noButtonBack: {
    paddingLeft: Platform.OS === 'ios' ? 0 : 20,
  },
  text: {
    fontSize: 25,
    fontFamily: 'vincHand',
    color: Colors.White,
    maxWidth: 140,
  },
  iconContainer: { marginRight: 10 },
});

export default style;
