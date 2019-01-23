/**
 * @flow
 * */

import style from './styles';
import type { Product } from '../../product';
import {
  View,
  FlatList,
  Animated,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Text,
  Image,
  LayoutAnimation,
} from 'react-native';
import React from 'react';
import Header from '../../components/header';
import type {
  NavigationScreenConfig,
  NavigationScreenProp,
} from 'react-navigation';
import {
  StackActions,
  NavigationActions,
} from 'react-navigation';
import { Routes } from '../../routes';
import { Products } from '../../product';
import type { State } from './state';
import Colors from '../../colors';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { Loader } from '../../components/loader';
import ProductItem from './productitem/productitem';
import { formatProducts } from './producttransform';
import type { ProductApiResponse } from './producttransform';
import obj from './../../../response.json';
import NoProductData from '../../components/noproductdata/noproductdata';
import EventEmitter from '../../lib/eventemitter';
import { getUid } from '../../lib/id';
import SidePane from './sidepane/sidepane';
import MenuButton from '../../components/menubutton/menubutton';

type ProductListProps = {
  navigation: NavigationScreenProp<void>,
};

const PAGE_SIZE = 20;

const INITIAL_PAGE = 1;

const ON_END_REACHED_THRESHOLD = 0.2;

const FlatListAnimated = Animated.createAnimatedComponent(FlatList);

const MENU_PRESS_EVENT = 'menuPress';

class ProductList extends React.PureComponent<ProductListProps, State> {
  static menuEventEmitter = new EventEmitter();

  static emitMenuPress = () =>
    ProductList.menuEventEmitter.emit(MENU_PRESS_EVENT);

  static navigationOptions: NavigationScreenConfig<{
    headerStyle: ViewStyleProp,
  }> = {
    headerTitle: (
      <Header
        text={'Products'}
        icon={null}
        buttonBackIsPresent={false}
      />
    ),
    headerLeft: <MenuButton onPress={ProductList.emitMenuPress}/>,
    headerTitleStyle: {
      color: Colors.White,
    },
    headerStyle: {
      backgroundColor: Colors.EpamBlue,
      borderBottomWidth: 0,
    },
  };

  sidePane: SidePane = null;

  openMenuListenerUid = null;

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
    this.openMenuListenerUid = ProductList.menuEventEmitter.addListener(
      MENU_PRESS_EVENT,
      this.sidePane.openMenu,
    );
    this.loadInitial();
  }

  componentWillUnmount() {
    ProductList.menuEventEmitter.removeListener(this.openMenuListenerUid);
  }

  async sendRequest(page: number, retryAction: Function) {
    try {
      // const response = await this.mockResponse(PAGE_SIZE, page);
      const response = await this.getResponse(PAGE_SIZE, page);
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
      this.handleRequestError(e, retryAction);
    }
  }

  render() {
    const { navigation } = this.props;
    const { products } = this.state;

    return (
      <View style={style.container}>
        {(() => {
          if (this.state.loading) {
            return <Loader size={'small'} color={Colors.DarkGray}/>;
          }
          return (
            <FlatListAnimated
              style={[style.frame, { opacity: this.state.listOpacity }]}
              data={products}
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
              ListEmptyComponent={<NoProductData/>}
            />
          );
        })()}
        <SidePane
          ref={sidePane => (this.sidePane = sidePane)}
          onCreditsSelect={this.onCreditsSelect}
          onLogoutSelect={this.onLogoutSelect}
        />
      </View>
    );
  }

  onCreditsSelect = () => {
    this.sidePane.closeMenu(() =>
      this.props.navigation.navigate({
        routeName: Routes.Credits,
      }),
    );
  };

  onLogoutSelect = () => {
    this.sidePane.closeMenu(() => {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: Routes.Login }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
    });
  };

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
    return <View style={style.separator}/>;
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

  getResponse(pageSize: number, currentPage: number) {
    return fetch(
      `http://ecsc00a02fb3.epam.com/rest/V1/products?searchCriteria[pageSize]=${pageSize}&searchCriteria[currentPage]=${currentPage}`,
      {
        method: 'GET',
      },
    );
  }

  async mockResponse(
    pageSize: number,
    page: number,
  ): Promise<{ ok: boolean, json: () => Promise<ProductApiResponse> }> {
    await new Promise(res => setTimeout(res, 1000));
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(obj),
    });
  }
}

const renderProductItem = (onProductClick: Function, product: Product) => (
  <ProductItem onProductClick={onProductClick} product={product}/>
);

export default ProductList;
