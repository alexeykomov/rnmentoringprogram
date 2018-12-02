/**
 * @flow
 * */

import style from '../../scene/productlist/styles';
import type { Product } from '../../product';
import {
  View,
  TouchableHighlight,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import React from 'react';
import { Icon, IconSizes } from '../../icons';
import type { ProductUid } from '../../product';

type ProductListProps = {
  onProductSelect: (productId: ProductUid) => void,
  products: Product[],
};

const ProductList = ({ onProductSelect, products }: ProductListProps) => (
  <View style={style.container}>
    <View>
      <Text style={style.header}>Products</Text>
    </View>
    <ScrollView>
      {products.map((product, index, products) => {
        const borderBottomModifier =
          index < products.length - 1
            ? style['product__no-border-bottom']
            : {};
        return (
          <TouchableHighlight onPress={() => onProductSelect(product.id)}>
            <View style={[style.product, borderBottomModifier]}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <View style={style.productIcon}>
                  <Icon product={product.id} size={IconSizes.Small} />
                </View>
                <Text style={style.productText}>{product.name}</Text>
              </View>
              <View style={style.productAngle}>
                <Text>{'>'}</Text>
              </View>
            </View>
          </TouchableHighlight>
        );
      })}
    </ScrollView>
  </View>
);

export default ProductList;
