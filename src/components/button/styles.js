/**
 * @flow
 * */

import { StyleSheet } from 'react-native';
import Colors from '../../colors';

const style = StyleSheet.create({
  returnButton: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    height: 40,
    alignItems: 'center',
  },
  returnBackground: {
    minWidth: 300,
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 3,
    borderColor: Colors.EpamBlue,
    backgroundColor: Colors.EpamBlue,
  },
  returnText: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 40,
    fontFamily: 'vincHand',
    color: Colors.White,
  },
});

export default style;
