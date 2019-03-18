/** @flow */
import { Routes } from './routes';
import type { NavigationScreenProp } from 'react-navigation';
import EventEmitter from './lib/eventemitter';

export const notificatonEmitter = new EventEmitter();

export const CART_NOTIFICATION = 'CART_NOTIFICATION';

export const createNavigateToCart = (
  navigation: NavigationScreenProp<*>,
) => {
  return notificatonEmitter.addListener(CART_NOTIFICATION, () => {
    navigation.navigate(Routes.Cart);
  })
};
