/**
 * @flow
 * */

import { StyleSheet } from 'react-native';
import Colors from '../../../colors';

const style = StyleSheet.create({
  product: {
    fontFamily: 'vincHand',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    height: 50,
    backgroundColor: Colors.White,
  },
  ['product__no-border-bottom']: {
    borderBottomWidth: 0,
  },
  productText: {
    fontFamily: 'vincHand',
    fontSize: 22,
  },
  productIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    marginRight: 20,
  },
  productAngle: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
  productAngleIcon: { width: 20, height: 20 },
});

export default style;
