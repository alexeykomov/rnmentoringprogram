/**
 * @flow
 */

export const Routes = {
  Login: 'Login',
  ProductList: 'ProductList',
  ProductFull: 'ProductFull',
  LocationScreen: 'LocationScreen',
  Modal: 'Modal',
  Credits: 'Credits',
  Info: 'Info',
};

export type Route = $Values<typeof Routes>;
