/**
 * @flow
 * */

import style from './styles';
import type { Product } from '../../product';
import {
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Animated,
} from 'react-native';
import React from 'react';
import { Icon, IconSizes } from '../../icons';
import { Header } from '../../components/header';
import type { NavigationScreenProp } from 'react-navigation';
import { NavigationEvents } from 'react-navigation';
import { Products } from '../../product';
import Colors from '../../colors';
import { Routes } from '../../routes';
import NetworkWatcher from '../../components/networkwatcher/networkwatcher';

type ProductListProps = {
  navigation: NavigationScreenProp<*>,
};

const NonExistentProduct: Product = {
  id: Products.NonExistent,
  iconId: Products.NonExistent,
  name: "It seems you're browsing nonexistent or deleted product",
  history: '',
  location: { longitude: 0, latitude: 0 },
  telephone: '',
};

class ProductFull extends React.PureComponent<ProductListProps> {
  static navigationOptions = ({ navigation }: ProductListProps) => {
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
          icon={<Icon product={product.iconId} size={IconSizes.Small} />}
          text={product.name}
          buttonBackIsPresent={true}
        />
      ),
    };
  };

  buttonY1 = new Animated.Value(20);
  buttonY2 = new Animated.Value(20);

  render() {
    const { navigation } = this.props;
    const product = navigation.getParam<product>('product', NonExistentProduct);

    return (
      <React.Fragment>
        <NetworkWatcher navigation={navigation} />
        <View style={style.container}>
          <NavigationEvents
            onDidFocus={payload => {
              Animated.stagger(50, [
                Animated.spring(this.buttonY1, {
                  toValue: 0,
                  useNativeDriver: true,
                }),
                Animated.timing(this.buttonY2, {
                  toValue: 0,
                  useNativeDriver: true,
                }),
              ]).start();
            }}
          />
          <ScrollView style={style.productTextContainer}>
            <Text style={style.productText}>{product.history}</Text>
            <TouchableOpacity
              style={style.returnButton}
              onPress={() =>
                navigation.navigate({
                  routeName: Routes.LocationScreen,
                  params: { product },
                })
              }
            >
              <Animated.View
                style={[
                  style.returnBackground,
                  { transform: [{ translateY: this.buttonY1 }] },
                ]}
              >
                <Text style={style.returnText}>Location</Text>
              </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.returnButton}
              onPress={() => navigation.goBack()}
            >
              <Animated.View
                style={[
                  style.returnBackground,
                  { transform: [{ translateY: this.buttonY2 }] },
                ]}
              >
                <Text style={style.returnText}>All Products</Text>
              </Animated.View>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </React.Fragment>
    );
  }
}

export default ProductFull;
