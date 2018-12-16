/**
 * @flow
 */

export const Routes = {
  Login: 'Login',
  ProductList: 'ProductList',
  ProductFull: 'ProductFull',
  LocationScreen: 'LocationScreen'
};


export type Route = $Values<typeof Routes>;