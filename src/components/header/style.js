/**
 * @flow
 * */

import { StyleSheet } from 'react-native';
import Colors from '../../colors';

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: 'vincHand',
    color: Colors.White,
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: Colors.EpamBlue,
  }
});

export default style;
