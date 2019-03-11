/**
 * @flow
 * */

import style from './styles';
import type { Product } from '../../product';
import { View, FlatList, Animated, LayoutAnimation } from 'react-native';
import React from 'react';
import Header from '../../components/header';
import type {
  NavigationScreenConfig,
  NavigationScreenProp,
} from 'react-navigation';
import { StackActions, NavigationActions } from 'react-navigation';
import { Routes } from '../../routes';
import type { State } from './state';
import Colors from '../../colors';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { Loader } from '../../components/loader';
import ProductItem from './productitem/productitem';
import NoProductData from '../../components/noproductdata/noproductdata';
import EventEmitter from '../../lib/eventemitter';
import { getUid } from '../../lib/id';
import SidePane from './sidepane/sidepane';
import MenuButton from '../../components/menubutton/menubutton';
import NetworkWatcher from '../../components/networkwatcher/networkwatcher';
import SplashScreen from 'react-native-splash-screen';
import { noop } from '../../lib/noop';
import RNRnmentoringprogramAsyncStorage from 'react-native-rnmentoringprogram-async-storage';
import { Sentry } from 'react-native-sentry';
import type { GlobalState } from '../../globalstate';
import GlobalContext, { LoadingStates } from '../../globalstate';
import { getProducts, INITIAL_PAGE } from '../../services/productservice';
import { getCart } from '../../services/cartservice';

type ProductListProps = {
  navigation: NavigationScreenProp<void>,
};

const ON_END_REACHED_THRESHOLD = 0.2;

const FlatListAnimated = Animated.createAnimatedComponent(FlatList);

const MENU_PRESS_EVENT = 'menuPress';

const SIDE_PANE_WARNING = "Side pane wasn't mounted.";

class ProductList extends React.PureComponent<ProductListProps, State> {
  static menuEventEmitter = new EventEmitter();

  static emitMenuPress = () =>
    ProductList.menuEventEmitter.emit(MENU_PRESS_EVENT);

  static navigationOptions: NavigationScreenConfig<{
    headerStyle: ViewStyleProp,
  }> = {
    headerTitle: (
      <Header text={'Products'} icon={null} buttonBackIsPresent={false} />
    ),
    headerLeft: <MenuButton onPress={ProductList.emitMenuPress} />,
    headerTitleStyle: {
      color: Colors.White,
    },
    headerStyle: {
      backgroundColor: Colors.EpamBlue,
      borderBottomWidth: 0,
    },
  };

  static contextType = GlobalContext;

  sidePane: SidePane | null;

  openMenuListenerUnsubscriber = noop;

  constructor() {
    super();
    this.state = {
      products: [],
      loading: false,
      refreshing: false,
      currentPage: INITIAL_PAGE,
      modalVisible: false,
      listOpacity: 0,
    };
  }

  componentDidMount() {
    this.openMenuListenerUnsubscriber = ProductList.menuEventEmitter.addListener(
      MENU_PRESS_EVENT,
      this.sidePane
        ? this.sidePane.openMenu
        : () => console.log(SIDE_PANE_WARNING),
    );
    this.loadInitial();
    SplashScreen.hide();
  }

  componentWillUnmount() {
    this.openMenuListenerUnsubscriber();
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
                if (context.isProductsLoading()) {
                  return <Loader size={'small'} color={Colors.DarkGray} />;
                }
                return (
                  <FlatListAnimated
                    style={[style.frame, { opacity: this.state.listOpacity }]}
                    data={context.getProducts()}
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
              <SidePane
                ref={sidePane => (this.sidePane = sidePane)}
                onCreditsSelect={this.onCreditsSelect}
                onLogoutSelect={this.onLogoutSelect}
                onInfoSelect={this.onInfoSelect}
                onCartSelect={this.onCartSelect}
              />
            </View>
          </React.Fragment>
        )}
      </GlobalContext.Consumer>
    );
  }

  onCartSelect = () => {
    this.sidePane
      ? this.sidePane.closeMenu(
          (): void =>
            void this.props.navigation.navigate({
              routeName: Routes.Cart,
            }),
        )
      : console.log(SIDE_PANE_WARNING);
  };

  onCreditsSelect = () => {
    this.sidePane
      ? this.sidePane.closeMenu(
          (): void =>
            void this.props.navigation.navigate({
              routeName: Routes.Credits,
            }),
        )
      : console.log(SIDE_PANE_WARNING);
  };

  onLogoutSelect = () => {
    this.sidePane
      ? this.sidePane.closeMenu(
          async (): Promise<void> => {
            try {
              await RNRnmentoringprogramAsyncStorage.setItem('token', '');
            } catch (e) {
              Sentry.captureException(e);
              console.log('Error - cannot remove token: ', e);
            }
            const resetAction = StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: Routes.Login }),
              ],
            });
            this.props.navigation.dispatch(resetAction);
          },
        )
      : console.log(SIDE_PANE_WARNING);
  };

  onInfoSelect = () => {
    this.sidePane
      ? this.sidePane.closeMenu(
          (): void => {
            this.props.navigation.navigate({
              routeName: Routes.Info,
            });
          },
        )
      : console.log(SIDE_PANE_WARNING);
  };

  keyExtractor = (item: Product, index: number) =>
    String(item.id) + getUid(item);

  loadInitial = () => {
    console.log('loadInitial: ');
    this.setState((prevState, props) => {
      getProducts(
        this.context,
        true,
        INITIAL_PAGE,
        this.loadInitial,
        this.handleRequestError,
        this.handleRequestSuccess,
      );
      getCart(this.context, this.loadInitial, this.handleRequestError, noop);
      return {
        ...prevState,
        loading: true,
      };
    });
  };

  onRefresh = () => {
    console.log('onRefresh: ');
    this.setState((prevState, props) => {
      getProducts(
        this.context,
        false,
        INITIAL_PAGE,
        this.onRefresh,
        this.handleRequestError,
        this.handleRequestSuccess,
      );
      return {
        ...prevState,
        refreshing: true,
      };
    });
  };

  onLoadMore = () => {
    console.log('onLoadMore: ');
    this.setState((prevState, props) => {
      const newPage = this.state.currentPage + 1;
      getProducts(
        this.context,
        false,
        newPage,
        this.onLoadMore,
        this.handleRequestError,
        this.handleRequestSuccess,
      );
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

  handleRequestSuccess = (page: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState((prevState, props) => {
      return {
        ...prevState,
        refreshing: false,
        currentPage: page,
        listOpacity: 1,
      };
    });
  };

  handleRequestError = (e: Error, retryAction: Function) => {
    const { navigation } = this.props;
    console.log('Fetch error: ', e);
    this.setState((prevState, props) => {
      navigation.navigate({
        routeName: Routes.Modal,
        params: { error: e, retryAction },
      });
      return {
        ...prevState,
        refreshing: false,
      };
    });
  };
}

const renderProductItem = (onProductClick: Function, product: Product) => (
  <ProductItem onProductClick={onProductClick} product={product} />
);

export default ProductList;
