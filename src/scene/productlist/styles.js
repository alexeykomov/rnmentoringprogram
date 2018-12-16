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
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Colors.EpamBlue,
  }
});

export default style;
