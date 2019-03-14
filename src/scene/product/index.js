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
import GlobalContext from './../../globalstate';
import type { GlobalState } from '../../globalstate';
import {
  addProductToCart,
  removeProductFromCart,
} from '../../services/cartservice';

type ProductPropsType = {
  navigation: NavigationScreenProp<*>,
};

type ProductStateType = {
  loading: boolean,
};

const NonExistentProduct: Product = {
  id: Products.NonExistent,
  iconId: Products.NonExistent,
  name: "It seems you're browsing nonexistent or deleted product",
  history: '',
  location: { longitude: 0, latitude: 0 },
  telephone: '',
  sku: '',
};

class ProductFull extends React.PureComponent<
  ProductPropsType,
  ProductStateType,
> {
  static navigationOptions = ({ navigation }: ProductPropsType) => {
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

  static contextType = GlobalContext;

  buttonY1 = new Animated.Value(20);
  buttonY2 = new Animated.Value(20);

  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  render() {
    const { navigation } = this.props;
    const product = navigation.getParam<product>('product', NonExistentProduct);

    return (
      <GlobalContext.Consumer>
        {(context: GlobalState) => (
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
                  onPress={this.navigateToLocation}
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
                {context.isItemsLoaded() && <TouchableOpacity
                  style={style.returnButton}
                  onPress={() => this.operateWithCart(context)}
                >
                  <Animated.View
                    style={[
                      style.returnBackground,
                      { transform: [{ translateY: this.buttonY2 }] },
                    ]}
                  >
                    <Text style={style.returnText}>
                      {this.getOperateWithCartText(context)}
                    </Text>
                  </Animated.View>
                </TouchableOpacity>}
              </ScrollView>
            </View>
          </React.Fragment>
        )}
      </GlobalContext.Consumer>
    );
  }

  getOperateWithCartText(context: GlobalState) {
    const { navigation } = this.props;
    const product = navigation.getParam<product>('product', NonExistentProduct);
    if (context.items.has(product.sku)) {
      return 'Remove from cart';
    }
    return 'Add to cart';
  }

  navigateToLocation() {
    const { navigation } = this.props;
    const product = navigation.getParam<product>('product', NonExistentProduct);
    return navigation.navigate({
      routeName: Routes.LocationScreen,
      params: { product },
    });
  }

  operateWithCart(context: GlobalState) {
    const { navigation } = this.props;
    const product = navigation.getParam<product>('product', NonExistentProduct);
    if (context.productsInProgress.has(product.sku)) {
      return;
    }
    console.log('context.items: ', context.items);
    const itemInCart = context.items.has(product.sku);
    console.log('itemInCart: ', itemInCart);
    if (itemInCart) {
      this.removeProductFromCart(product, context);
    } else {
      this.addProductToCart(product, context);
    }
  }

  addProductToCart(product: Product, context: GlobalState) {
    addProductToCart(
      product,
      context,
      () => this.addProductToCart(product, context),
      this.handleRequestError,
    );
  }

  removeProductFromCart(product: Product, context: GlobalState) {
    removeProductFromCart(
      product,
      context,
      () => this.removeProductFromCart(product, context),
      this.handleRequestError,
    );
  }

  handleRequestError(e: Error, retryAction: Function) {
    const { navigation } = this.props;
    navigation.navigate({
      routeName: Routes.Modal,
      params: { error: e, retryAction },
    });
  }
}

export default ProductFull;
