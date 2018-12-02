/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import type { Scene } from 'app/scenes';
import Scenes from 'app/scenes';
import LoginScreen from 'app/scene/login';
import ProductList from 'app/scene/productlist';
import Colors from 'app/colors';
import type { Product } from 'app/product';
import { getUid } from 'app/lib/id';
import { state } from 'app/state';
import type { State } from 'app/state';
import type { ProductUid } from 'app/product';
import { Products } from 'app/product';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};

export default class App extends PureComponent<Props, State> {
  constructor() {
    super();
    this.state = state;
  }

  render() {
    const { currentScreen, products } = this.state;
    return (
      <View style={styles.container}>
        {(() => {
          switch (currentScreen) {
            case Scenes.Login:
              return <LoginScreen onLoginPress={this.onLoginPress} />;
            case Scenes.ProductList:
              return (
                <ProductList
                  products={products}
                  onProductSelect={this.onProductSelect}
                />
              );
            case Scenes.Product:
              return (
                <Text style={styles.welcome}>
                  Welcome to React Native, hey!!!!!
                </Text>
              );
          }
        })()}
      </View>
    );
  }

  onLoginPress = () => {
    this.setState((prevState: State, props: Props) => ({
      ...prevState,
      currentScreen: Scenes.ProductList,
    }));
  };

  onProductSelect(productId: ProductUid) {
    this.setState((prevState: State, props: Props) => ({
      ...prevState,
      currentProductId: productId,
      currentScreen: Scenes.Product,
    }));
  }

  onReturnFromProduct() {
    this.setState((prevState: State, props: Props) => ({
      ...prevState,
      currentProductId: Products.NonExistent,
      currentScreen: Scenes.ProductList,
    }));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'vincHand',
    color: Colors.Graphite,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
