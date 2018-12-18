/**
 * @flow
 * */

import { StyleSheet } from 'react-native';
import Colors from '../../colors';

const style = StyleSheet.create({
  header: {
    height: 110,
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: 'vincHand',
    color: Colors.White,
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: Colors.EpamBlue,
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: Colors.White,
  },
  frame: { marginTop: -StyleSheet.hairlineWidth },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.EpamBlue,
  }
});

export default style;
