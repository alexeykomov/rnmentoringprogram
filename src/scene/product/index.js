/**
 * @flow
 * */

import style from './styles';
import type { Product } from '../../product';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native';
import React from 'react';
import { Icon, IconSizes } from '../../icons';
import { Header } from '../../components/header';
import type {
  NavigationScreenConfig,
  NavigationScreenProp,
} from 'react-navigation';
import { Products } from '../../product';
import Colors from '../../colors';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { Routes } from '../../routes';

type ProductListProps = {
  navigation: NavigationScreenProp<void>,
};

const NonExistentProduct: Product = {
  id: Products.NonExistent,
  iconId: Products.NonExistent,
  name: "It seems you're browsing nonexistent or deleted product",
  history: '',
  location: {longitude: 0, latitude: 0},
  telephone: ''
};

class ProductFull extends React.PureComponent<ProductListProps> {
  static navigationOptions: NavigationScreenConfig<{
    headerStyle: ViewStyleProp,
  }> = ({ navigation }) => {
    const product = navigation.getParam<product>('product', NonExistentProduct);
    return {
      headerTitleStyle: {
        color: Colors.White,
      },
      headerStyle: {
        backgroundColor: Colors.EpamBlue,
        borderBottomWidth: 0,
      },
      headerTitle: (
        <Header
          icon={<Icon product={product.id} size={IconSizes.Small} />}
          text={product.name}
        />
      ),
    };
  };

  render() {
    const { navigation } = this.props;
    const product = navigation.getParam<product>('product', NonExistentProduct);
    return (
      <View style={style.container}>
        <ScrollView style={style.productTextContainer}>
          <Text style={style.productText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            arcu ante, mollis eget gravida a, accumsan in purus. Fusce in
            tincidunt turpis, id euismod mauris. Integer elementum congue dolor.
            Pellentesque luctus mi tempus urna lacinia varius.
            cursus et.
          </Text>

          <TouchableOpacity
            style={style.returnButton}
            onPress={() => navigation.navigate({
              routeName: Routes.LocationScreen,
              params: { product },
            })}
          >
            <View style={style.returnBackground}>
              <Text style={style.returnText}>Location</Text>
            </View>
          </TouchableOpacity>
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
  }
}

export default ProductFull;
