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
    textAlign: 'center',

    backgroundColor: Colors.EpamBlue,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: 'vincHand',
    color: Colors.White,
  },
  iconContainer: { marginRight: 10 },
});

export default style;
