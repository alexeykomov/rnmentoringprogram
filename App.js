/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { PureComponent } from 'react';
import LoginScreen from './src/scene/login';
import ProductList from './src/scene/productlist';
import ProductFull from './src/scene/product';
import { createStackNavigator, createAppContainer } from 'react-navigation';


export const Routes = {
  Login: 'Login',
  ProductList: 'ProductList',
  ProductFull: 'ProductFull',
};

export type Route = $Values<typeof Routes>;

const AppNavigator = createStackNavigator(
  {
    [Routes.Login]: LoginScreen,
    [Routes.ProductList]: ProductList,
    [Routes.ProductFull]: ProductFull,
  },
  {
    initialRouteName: Routes.Login,
  }
);

export default createAppContainer(AppNavigator);