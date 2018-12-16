/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import LoginScreen from './scene/login';
import ProductList from './scene/productlist';
import ProductFull from './scene/product';
import LocationScreen from './scene/location';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Routes } from './routes';

const AppNavigator = createStackNavigator(
  {
    [Routes.Login]: LoginScreen,
    [Routes.ProductList]: ProductList,
    [Routes.ProductFull]: ProductFull,
    [Routes.LocationScreen]: LocationScreen,
  },
  {
    initialRouteName: Routes.Login,
  }
);

export default createAppContainer(AppNavigator);