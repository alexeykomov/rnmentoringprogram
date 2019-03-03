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
  Animated, LayoutAnimation,
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
import { formatProducts } from '../productlist/producttransform';
import { Sentry } from 'react-native-sentry';
import { createCartRequest } from '../cart/cartservice';

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
      <GlobalContext.Consumer>
        {(context: GlobalState) => (
          <React.Fragment>
            <NetworkWatcher navigation={navigation} />
            <Text>{[...context.items.values()].join()}</Text>
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
                <TouchableOpacity
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
                </TouchableOpacity>
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
    if (context.items.has(product.id)) {
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
    if (context.items.has(product.id)) {
      context.removeItem(product.id);
    } else {
      context.addItem(product.id);
    }
  }

  async sendRequest(context: GlobalState, retryAction: Function) {
    try {
      const createCartResponse = await createCartRequest();
      const responseIsOk = createCartResponse.ok;
      if (!responseIsOk) {
        return this.handleRequestError(
          new Error('Response is not ok.'),
          retryAction,
        );
      }
      const qouteId = /(\d+)/.exec(await createCartResponse.json())[0];
      this.handleRequestSuccess(products, page);
    } catch (e) {
      Sentry.captureException(e);
      this.handleRequestError(e, retryAction);
    }
  }

  handleRequestSuccess(products: Product[], page: number) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState((prevState, props) => {
      return {
        ...prevState,
        products: [...this.state.products, ...products],
        loading: false,
        refreshing: false,
        currentPage: page,
        listOpacity: 1,
      };
    });
  }

  handleRequestError(e: Error, retryAction: Function) {
    const { navigation } = this.props;

    console.log('Fetch error: ', e);
    this.setState((prevState, props) => {
      navigation.navigate({
        routeName: Routes.Modal,
        params: { error: e, retryAction },
      });
      return {
        ...prevState,
        loading: false,
        refreshing: false,
      };
    });
  }

}

export default ProductFull;
