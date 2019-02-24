/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import LoginScreen from './scene/login';
import ProductList from './scene/productlist';
import ProductFull from './scene/product';
import LocationScreen from './scene/location';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Routes } from './routes';
import ModalScreen from './scene/modal/modal';
import CreditsScreen from './scene/credits/credits';
import InfoScreen from './scene/info/info';
import { UIManager, Platform } from 'react-native';
import { Sentry } from 'react-native-sentry';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

Sentry.config(
  'https://0d0b5ca57ec84c48ae9c4f78a04ea338@sentry.io/1401443',
).install();

const AppNavigator = createStackNavigator(
  {
    [Routes.Login]: LoginScreen,
    [Routes.ProductList]: ProductList,
    [Routes.ProductFull]: ProductFull,
    [Routes.LocationScreen]: LocationScreen,
    [Routes.Credits]: CreditsScreen,
    [Routes.Info]: InfoScreen,
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
