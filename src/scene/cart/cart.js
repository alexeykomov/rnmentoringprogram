/**
 * @flow
 * */

import style from './styles';
import type { Product } from '../../product';
import { View, FlatList, Animated, LayoutAnimation, Image } from 'react-native';
import React from 'react';
import Header from '../../components/header';
import type {
  NavigationScreenConfig,
  NavigationScreenProp,
} from 'react-navigation';
import { Routes } from '../../routes';
import type { State } from './state';
import Colors from '../../colors';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { Loader } from '../../components/loader';
import ProductItem from '../../components/productitem/productitem';
import obj from './../../../response.json';
import NoProductData from '../../components/noproductdata/noproductdata';
import { getUid } from '../../lib/id';
import NetworkWatcher from '../../components/networkwatcher/networkwatcher';
import { Sentry } from 'react-native-sentry';
import Button from '../../components/button/button';
import type { GlobalState } from '../../globalstate';
import GlobalContext from '../productlist/sidepane/sidepane';
import { IconSizes, IconSizeStyles } from '../../icons';

type ProductListProps = {
  navigation: NavigationScreenProp<void>,
};

const PAGE_SIZE = 20;

const INITIAL_PAGE = 1;

const ON_END_REACHED_THRESHOLD = 0.2;

const FlatListAnimated = Animated.createAnimatedComponent(FlatList);

class Cart extends React.PureComponent<ProductListProps, State> {
  static navigationOptions: NavigationScreenConfig<{
    headerStyle: ViewStyleProp,
  }> = {
    headerTitle: (
      <Header
        text={'Cart'}
        icon={
          <Image
            style={IconSizeStyles[IconSizes.Small]}
            source={require('./shopping-cart.png')}
          />
        }
        buttonBackIsPresent={false}
      />
    ),
    headerTitleStyle: {
      color: Colors.White,
    },
    headerStyle: {
      backgroundColor: Colors.EpamBlue,
      borderBottomWidth: 0,
    },
  };

  constructor() {
    super();
    this.state = {
      loading: false,
      refreshing: false,
      currentPage: INITIAL_PAGE,
      modalVisible: false,
      listOpacity: 0,
    };
  }

  componentDidMount() {
    this.loadInitial();
  }

  componentWillUnmount() {}

  async sendRequest(page: number, retryAction: Function) {
    try {
      const response = await this.mockResponse(PAGE_SIZE, page);
      // const response = await this.createCartRequest(PAGE_SIZE, page);
      const responseIsOk = response.ok;
      if (!responseIsOk) {
        return this.handleRequestError(
          new Error('Response is not ok.'),
          retryAction,
        );
      }
      const products = formatProducts(await response.json());
      this.handleRequestSuccess(products, page);
    } catch (e) {
      Sentry.captureException(e);
      this.handleRequestError(e, retryAction);
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <GlobalContext.Consumer>
        {(context: GlobalState) => (
          <React.Fragment>
            <NetworkWatcher navigation={navigation} />
            <View style={style.container}>
              {(() => {
                if (this.state.loading) {
                  return <Loader size={'small'} color={Colors.DarkGray} />;
                }
                return (
                  <FlatListAnimated
                    style={[style.frame, { opacity: this.state.listOpacity }]}
                    data={context.items}
                    keyExtractor={this.keyExtractor}
                    renderItem={({ item }) =>
                      renderProductItem(
                        () => this.onProductClick(navigation, item),
                        item,
                      )
                    }
                    onEndReachedThreshold={ON_END_REACHED_THRESHOLD}
                    onEndReached={this.onLoadMore}
                    ItemSeparatorComponent={this.renderSeparator}
                    ListHeaderComponent={this.renderSeparator}
                    ListFooterComponent={this.renderSeparator}
                    refreshing={this.state.refreshing}
                    onRefresh={this.onRefresh}
                    ListEmptyComponent={<NoProductData />}
                  />
                );
              })()}
              <Button onPress={this.onClear} caption={'Clear'} />
              <Button onPress={this.onCheckout} caption={'Checkout'} />
            </View>
          </React.Fragment>
        )}
      </GlobalContext.Consumer>
    );
  }

  onClear = () => {};

  onCheckout = () => {};

  keyExtractor = (item: Product, index: number) =>
    String(item.id) + getUid(item);

  loadInitial = () => {
    this.setState((prevState, props) => {
      this.sendRequest(INITIAL_PAGE, this.loadInitial);
      return {
        ...prevState,
        loading: true,
      };
    });
  };

  onRefresh = () => {
    this.setState((prevState, props) => {
      this.sendRequest(INITIAL_PAGE, this.onRefresh);
      return {
        ...prevState,
        refreshing: true,
      };
    });
  };

  onLoadMore = () => {
    this.setState((prevState, props) => {
      const newPage = this.state.currentPage + 1;
      this.sendRequest(newPage, this.onLoadMore);
      return {
        ...prevState,
      };
    });
  };

  onProductClick(navigation: NavigationScreenProp<void>, product: Product) {
    return navigation.navigate({
      routeName: Routes.ProductFull,
      params: { product },
    });
  }

  renderSeparator() {
    return <View style={style.separator} />;
  }

  handleRequestSuccess(products: Product[], page: number) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState((prevState, props) => {
      return {
        ...prevState,
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


const renderProductItem = (onProductClick: Function, product: Product) => (
  <ProductItem onProductClick={onProductClick} product={product} />
);

export default Cart;
