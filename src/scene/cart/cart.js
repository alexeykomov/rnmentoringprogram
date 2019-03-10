/**
 * @flow
 * */

import style from './styles';
import type { Product } from '../../product';
import { View, FlatList, Animated, Image } from 'react-native';
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
import NoProductData from '../../components/noproductdata/noproductdata';
import { getUid } from '../../lib/id';
import NetworkWatcher from '../../components/networkwatcher/networkwatcher';
import Button from '../../components/button/button';
import type { GlobalState } from '../../globalstate';
import GlobalContext from '../../globalstate';
import { IconSizes, IconSizeStyles } from '../../icons';
import { getCart } from '../../services/cartservice';
import { noop } from '../../lib/noop';

type ProductListProps = {
  navigation: NavigationScreenProp<void>,
};

const INITIAL_PAGE = 1;

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

  static contextType = GlobalContext;

  constructor() {
    super();
    this.state = {
      loading: false,
      refreshing: false,
      currentPage: INITIAL_PAGE,
      listOpacity: 0,
      quoteId: '',
    };
  }

  componentDidMount() {
    this.loadInitial();
  }

  componentWillUnmount() {}

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
                    data={context.getCartProducts()}
                    keyExtractor={this.keyExtractor}
                    renderItem={({ item }) =>
                      renderProductItem(
                        () => this.onProductClick(navigation, item),
                        item,
                      )
                    }
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
    const navigation = this.props.navigation;
    getCart(
      this.context,
      this.loadInitial,
      (e, retryAction) => {
        navigation.navigate({
          routeName: Routes.Modal,
          params: { error: e, retryAction },
        });
      },
      () =>
        this.setState(prevState => ({
          ...prevState,
          refreshing: false,
          listOpacity: 1,
        })),
    );
  };

  onRefresh = () => {
    console.log('this.context: ', this.context);

    this.setState((prevState, props) => {
      const navigation = this.props.navigation;
      getCart(
        this.context,
        this.onRefresh,
        (e, retryAction) => {
          navigation.navigate({
            routeName: Routes.Modal,
            params: { error: e, retryAction },
          });
        },
        () =>
          this.setState(prevState => ({
            ...prevState,
            refreshing: false,
            listOpacity: 1,
          })),
      );
      return {
        ...prevState,
        refreshing: true,
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
}

const renderProductItem = (onProductClick: Function, product: Product) => (
  <ProductItem onProductClick={onProductClick} product={product} />
);

export default Cart;
