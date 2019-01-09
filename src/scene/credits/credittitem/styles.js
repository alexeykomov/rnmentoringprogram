/**
 * @flow
 * */

import { StyleSheet } from 'react-native';
import Colors from '../../../colors';

const style = StyleSheet.create({
  credit: {
    fontFamily: 'vincHand',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: Colors.White,
  },
  creditText: {
    fontFamily: 'vincHand',
    fontSize: 22,
  },
  creditLink: {
    fontFamily: 'vincHand',
    fontSize: 22,
    color: Colors.EpamBlue,
  },
});

export default style;
