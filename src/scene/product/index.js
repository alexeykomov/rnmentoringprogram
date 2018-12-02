/**
 * @flow
 * */

import ProductListStyle from './styles';
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
import Colors from '../../colors';

type ProductListProps = {
  productId: ProductUid,
  products: Product[],
  onReturnFromProduct: () => void,
};

const getProductName = (products, productId) => {
  const productsWithThisId = products.filter(
    product => product.id === productId,
  );
  return productsWithThisId.length
    ? productsWithThisId[0].name
    : "It seems you're browsing unexisteing or delered product";
};

const ProductFull = ({
  productId,
  products,
  onReturnFromProduct,
}: ProductListProps) => (
  <View style={ProductListStyle.container}>
    <View style={ProductListStyle.header}>
      <View style={{ marginLeft: 20, marginRight: 20 }}>
        <Icon product={productId} size={IconSizes.Big} />
      </View>
      <Text style={ProductListStyle.headerText}>
        {getProductName(products, productId)}
      </Text>
    </View>
    <ScrollView style={ProductListStyle.productTextContainer}>
      <Text style={ProductListStyle.productText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus arcu
        ante, mollis eget gravida a, accumsan in purus. Fusce in tincidunt
        turpis, id euismod mauris. Integer elementum congue dolor. Pellentesque
        luctus mi tempus urna lacinia varius. Nulla velit nibh, tempor sit amet
        malesuada eu, interdum quis diam. Ut accumsan semper vulputate. Maecenas
        faucibus eros nec laoreet lacinia. Sed nec odio justo. Nunc lobortis
        venenatis lorem, ac condimentum velit. Nulla vel mollis enim. Curabitur
        sit amet dolor eleifend, faucibus nisi in, auctor ante. Nulla aliquam
        pretium lorem. Maecenas nec consectetur erat. Proin semper laoreet ex,
        dapibus tempus urna cursus et.
      </Text>
      <TouchableHighlight
        style={{ marginTop: 20, width: 200, height: 40 }}
        onPress={onReturnFromProduct}
      >
        <View style={ProductListStyle.returnButton}>
          <Text style={ProductListStyle.return}>All Products</Text>
        </View>
      </TouchableHighlight>
    </ScrollView>
  </View>
);

export default ProductFull;
