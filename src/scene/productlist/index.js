/**
 * @flow
 * */

import style from '../../scene/productlist/styles';
import type { Product, ProductUid } from '../../product';
import {
  View,
  TouchableHighlight,
  Image,
  Text,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { Icon, IconSizes } from '../../icons';
import Header from '../../components/header';
import type {
  NavigationScreenConfig,
  NavigationScreenProp,
} from 'react-navigation';
import { Routes } from '../../routes';
import { Products } from '../../product';
import type { State } from './state';
import Colors from '../../colors';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { Loader } from '../../components/loader';
import { getRandomProductId } from '../../lib/id';

type ProductListProps = {
  navigation: NavigationScreenProp<void>,
};

const PAGE_SIZE = 20;

const INITIAL_PAGE = 0;

const renderProductItem = (onProductClick: Function, product: Product) => (
  <ProductItem onProductClick={onProductClick} product={product} />
);

type ProductItemProps = {
  onProductClick: Function,
  product: Product,
};

const ProductItem = ({ onProductClick, product }: ProductItemProps) => {
  return (
    <TouchableHighlight onPress={onProductClick} key={product.id}>
      <View style={style.product}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <View style={style.productIcon}>
            <Icon product={product.iconId} size={IconSizes.Small} />
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
};

class ProductList extends React.PureComponent<ProductListProps, State> {
  static navigationOptions: NavigationScreenConfig<{
    headerStyle: ViewStyleProp,
  }> = {
    headerTitle: <Header text={'Products'} icon={null} />,
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
      products: [],
      loading: false,
      refreshing: false,
      currentPage: INITIAL_PAGE,
    };
  }

  async componentDidMount() {
    this.setState((prevState, props) => {
      this.sendRequest(INITIAL_PAGE);
      return {
        ...prevState,
        loading: true,
      };
    });
  }

  async sendRequest(page: number) {
    try {
      const response = await this.mockResponse(PAGE_SIZE, page);
      //const response = await this.getResponse(PAGE_SIZE);
      const responseIsOk = response.ok;
      if (!responseIsOk) {
        return this.handleRequestError(new Error('Response is not ok.'));
      }
      const products = await response.json();
      this.handleRequestSuccess(products);
    } catch (e) {
      this.handleRequestError(e);
    }
  }

  render() {
    const { navigation } = this.props;
    const { products } = this.state;

    return (
      <View style={style.container}>
        {this.state.loading ? (
          <Loader size={'small'} color={Colors.DarkGray} />
        ) : (
          <FlatList
            style={style.frame}
            data={products}
            keyExtractor={(item: Product, index: number) => String(item.id)}
            renderItem={({ item }) =>
              renderProductItem(
                () => this.onProductClick(navigation, item),
                item,
              )
            }
            onEndReachedThreshold={0.5}
            onEndReached={this.onLoadMore}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderSeparator}
            ListFooterComponent={this.renderSeparator}
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh}
          />
        )}
      </View>
    );
  }

  onRefresh = () => {
    this.setState((prevState, props) => {
      this.sendRequest(INITIAL_PAGE);
      return {
        ...prevState,
        refreshing: true,
      };
    });
  };

  onLoadMore = () => {
    this.setState((prevState, props) => {
      const newPage = this.state.currentPage + 1;
      this.sendRequest(newPage);
      return {
        ...prevState,
        currentPage: newPage,
      };
    });
  };

  onProductClick(navigation: NavigationScreenProp<void>, product: Product) {
    console.log('onProductClick: ', product);
    return navigation.navigate({
      routeName: Routes.ProductFull,
      params: { product },
    });
  }

  renderSeparator() {
    return <View style={style.separator} />;
  }

  handleRequestSuccess(products: Product[]) {
    this.setState((prevState, props) => {
      return {
        ...prevState,
        products: [...this.state.products, ...products],
        loading: false,
        refreshing: false,
      };
    });
  }

  handleRequestError(e: Error) {
    console.log('Fetch error: ', e);
    this.setState((prevState, props) => {
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
  ): Promise<{ ok: boolean, json: () => Promise<Product[]> }> {
    const array = [];
    await new Promise(res => setTimeout(res, 1000));
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve(
          new Array(pageSize).fill(null).map(
            (el: null): Product => {
              const randomProductId = getRandomProductId();
              return {
                id: randomProductId,
                iconId: randomProductId,
                name: 'Battery',
                telephone: '+375291111111',
                location: {
                  latitude: 53.9480826,
                  longitude: 27.7105363,
                },
                history: 'Lorem Ipsum',
              };
            },
          ),
        ),
    });
  }
}

export default ProductList;
