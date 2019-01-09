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
import ModalScreen from './scene/modal/modal';
import CreditsScreen from './scene/credits/credits';

const AppNavigator = createStackNavigator(
  {
    [Routes.Login]: LoginScreen,
    [Routes.ProductList]: ProductList,
    [Routes.ProductFull]: ProductFull,
    [Routes.LocationScreen]: LocationScreen,
    [Routes.Credits]: CreditsScreen,
  },
  {
    initialRouteName: Routes.Login,
  },
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: AppNavigator,
    },
    [Routes.Modal]: {
      screen: ModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export default createAppContainer(RootStack);