/**
 * @flow
 * */

import { StyleSheet } from 'react-native';
import Colors from '../../colors';

const ProductListStyle = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: 'vincHand',
    color: Colors.Graphite,
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
  productText: {
    fontFamily: 'vincHand',
    color: Colors.Graphite,
    fontSize: 22,
  },
  productTextContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  returnButton: {

    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 3,
    borderColor: Colors.EpamBlue,
    backgroundColor: Colors.EpamBlue,
  },
  return: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 40,
    fontFamily: 'vincHand',
    color: Colors.White,
  },
});

export default ProductListStyle;