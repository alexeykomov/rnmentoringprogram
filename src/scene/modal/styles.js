/**
 * @flow
 * */

import { StyleSheet } from 'react-native';
import Colors from '../../colors';

const style = StyleSheet.create({
  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.White,
  },
  modalSubContainer: {
    ...StyleSheet.absoluteFillObject,
    margin: 20,
    padding: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.EpamBlue,
    backgroundColor: Colors.White,
  },
  modalHeader: {
    fontFamily: 'vincHand',
    fontSize: 25,
    marginBottom: 30,
  },
  modalText: {
    fontFamily: 'vincHand',
    fontSize: 20,
    marginBottom: 20,
  }
});

export default style;
