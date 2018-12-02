/**
 * @flow
 * */

import { StyleSheet } from 'react-native';
import Colors from 'app/colors';

const ProductListStyle = StyleSheet.create({
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: 'vincHand',
    color: Colors.Graphite,
  },
  container: {

  },
  product: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  productIcon: {
    width: 50,
    height: 50,
  },
});

export default ProductListStyle;