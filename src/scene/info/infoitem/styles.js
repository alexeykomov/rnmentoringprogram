/**
 * @flow
 * */

import { StyleSheet } from 'react-native';
import Colors from '../../../colors';

const style = StyleSheet.create({
  info: {
    fontFamily: 'vincHand',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: Colors.White,
  },
  infoNameText: {
    fontFamily: 'vincHand',
    fontSize: 22,
  },
  infoValueText: {
    fontFamily: 'vincHand',
    fontSize: 22,
    color: Colors.MediumGray,
  },
});

export default style;
