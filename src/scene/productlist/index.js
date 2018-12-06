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
import Header from '../../components/header';
import type { NavigationScreenProp } from 'react-navigation';
import { Routes } from '../../../App';
import { Products } from '../../product';
import { state } from './state';
import type { State } from './state';

type ProductListProps = {
  navigation: NavigationScreenProp<void>,
};

class ProductList extends React.PureComponent<ProductListProps, State> {
  constructor() {
    super();
    this.state = state;
  }

  render() {
    const { navigation } = this.props;
    const { products } = this.state;

    return (
      <View style={style.container}>
        <Header text={'Products'} icon={null} />
        <ScrollView style={style.frame}>
          {products.map((product, index, products) => {
            const borderBottomModifier =
              index < products.length - 1
                ? style['product__no-border-bottom']
                : {};
            return (
              <TouchableHighlight
                onPress={this.onProductClick(navigation, product)}
                key={product.id}
              >
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
                    <Image
                      style={{ width: 20, height: 20 }}
                      source={require('./angle-arrow-pointing-to-right.png')}
                    />
                  </View>
                </View>
              </TouchableHighlight>
            );
          })}
        </ScrollView>
      </View>
    );
  }

  onProductClick(navigation: NavigationScreenProp<void>, product: Product) {
    return () =>
      navigation.navigate({
        routeName: Routes.ProductFull,
        params: { product },
      });
  }
}

export default ProductList;
