/**
 * @flow
 */

export const Routes = {
  Login: 'Login',
  ProductList: 'ProductList',
  ProductFull: 'ProductFull',
  LocationScreen: 'LocationScreen',
  Modal: 'Modal',
};

export type Route = $Values<typeof Routes>;