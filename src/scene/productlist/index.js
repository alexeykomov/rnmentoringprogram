/**
 * @flow
 * */

import ProductListStyle from 'app/scene/productlist/styles';
import type { Product } from 'app/product';
import { View, TouchableHighlight, Image, Text } from 'react-native';
import React from 'react';
import { Icon } from 'app/icons';
import type { ProductUid } from 'app/product';

type ProductListProps = {
  onProductSelect: (productId: ProductUid) => void,
  products: Product[],
};

const ProductList = ({ onProductSelect, products }: ProductListProps) => (
  <View style={ProductListStyle.container}>
    <View>
      <Text>Products</Text>
    </View>
    {products.map(product => (
      <TouchableHighlight
        key={product.id}
        onPress={() => onProductSelect(product.id)}
      >
        <View style={ProductListStyle.product}>
          <View style={{ flex: 1, justifyContent: 'flex-start' }}>
            <Icon product={product.id} size={0} />
            <Text>{product.name}</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'flex-end' }}>
            <Text>&gt;</Text>
          </View>
        </View>
      </TouchableHighlight>
    ))}
  </View>
);

export default ProductList;
