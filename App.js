/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { PureComponent } from 'react';
import { Platform, StyleSheet, Text, View, Image } from 'react-native';
import Scenes from './src/scenes';
import LoginScreen from './src/scene/login';
import ProductList from './src/scene/productlist';
import ProductFull from './src/scene/product';
import Colors from './src/colors';
import { state } from './src/state';
import type { State } from './src/state';
import type { ProductUid } from './src/product';
import { Products } from './src/product';


type Props = {};

export default class App extends PureComponent<Props, State> {
  constructor() {
    super();
    this.state = state;
  }

  render() {
    const { currentScreen, products, currentProductId } = this.state;
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
                <ProductFull products={products} productId={currentProductId} onReturnFromProduct={this.onReturnFromProduct}/>
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
    }))
  };

  onProductSelect = (productId: ProductUid) => {
    this.setState((prevState:State, props: Props) => ({
      ...prevState,
      currentProductId: productId,
      currentScreen: Scenes.Product,
    }));
  };

  onReturnFromProduct = () => {
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
