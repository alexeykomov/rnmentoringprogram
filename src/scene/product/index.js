/**
 * @flow
 * */

import style from './styles';
import type { Product } from '../../product';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import React from 'react';
import { Icon, IconSizes } from '../../icons';
import type { ProductUid } from '../../product';
import { Header } from '../../components/header';
import type { NavigationScreenProp } from 'react-navigation';
import { Products } from '../../product';

type ProductListProps = {
  productId: ProductUid,
  products: Product[],
  onReturnFromProduct: () => void,
  navigation: NavigationScreenProp<void>,
};

const NonExistentProduct: Product = {
  id: Products.NonExistent,
  name: "It seems you're browsing nonexistent or deleted product",
};

const ProductFull = ({ onReturnFromProduct, navigation }: ProductListProps) => {
  const product = navigation.getParam<product>(
    'product', NonExistentProduct
  );
  return (
    <View style={style.container}>
      <Header
        icon={<Icon product={product.id} size={IconSizes.Big} />}
        text={product.name}
      />
      <ScrollView style={style.productTextContainer}>
        <Text style={style.productText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus arcu
          ante, mollis eget gravida a, accumsan in purus. Fusce in tincidunt
          turpis, id euismod mauris. Integer elementum congue dolor.
          Pellentesque luctus mi tempus urna lacinia varius. Nulla velit nibh,
          tempor sit amet malesuada eu, interdum quis diam. Ut accumsan semper
          vulputate. Maecenas faucibus eros nec laoreet lacinia. Sed nec odio
          justo. Nunc lobortis venenatis lorem, ac condimentum velit. Nulla vel
          mollis enim. Curabitur sit amet dolor eleifend, faucibus nisi in,
          auctor ante. Nulla aliquam pretium lorem. Maecenas nec consectetur
          erat. Proin semper laoreet ex, dapibus tempus urna cursus et.
        </Text>
        <TouchableOpacity
          style={style.returnButton}
          onPress={() => navigation.goBack()}
        >
          <View style={style.returnBackground}>
            <Text style={style.returnText}>All Products</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProductFull;
