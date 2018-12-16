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

type ProductListProps = {
  navigation: NavigationScreenProp<void>,
};

const NonExistentProduct: Product = {
  id: Products.NonExistent,
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
    return (
      <View style={style.container}>
        <ScrollView style={style.productTextContainer}>
          <Text style={style.productText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            arcu ante, mollis eget gravida a, accumsan in purus. Fusce in
            tincidunt turpis, id euismod mauris. Integer elementum congue dolor.
            Pellentesque luctus mi tempus urna lacinia varius. Nulla velit nibh,
            tempor sit amet malesuada eu, interdum quis diam. Ut accumsan semper
            vulputate. Maecenas faucibus eros nec laoreet lacinia. Sed nec odio
            justo. Nunc lobortis venenatis lorem, ac condimentum velit. Nulla
            vel mollis enim. Curabitur sit amet dolor eleifend, faucibus nisi
            in, auctor ante. Nulla aliquam pretium lorem. Maecenas nec
            consectetur erat. Proin semper laoreet ex, dapibus tempus urna
            cursus et.
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
  }
}

export default ProductFull;
