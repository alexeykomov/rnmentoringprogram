/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import LoginScreen from './scene/login';
import ProductList from './scene/productlist';
import ProductFull from './scene/product/product';
import LocationScreen from './scene/location';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Routes } from './routes';
import ModalScreen from './scene/modal/modal';
import CreditsScreen from './scene/credits/credits';
import InfoScreen from './scene/info/info';
import { UIManager, Platform, PushNotificationIOS } from 'react-native';
import { Sentry } from 'react-native-sentry';
import Cart from './scene/cart/cart';
import PushNotification from 'react-native-push-notification';
import { notificatonEmitter, CART_NOTIFICATION } from './notificationemitter';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

PushNotification.configure({
  onNotification: notification => {
    notificatonEmitter.emit(CART_NOTIFICATION);
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
});

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
    [Routes.Cart]: Cart,
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

const NavigationContainer = createAppContainer(RootStack);

export default NavigationContainer;
