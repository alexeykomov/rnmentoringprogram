/** @flow */

import React from 'react';
import type { Product } from './product';
import type { CartItemType } from './services/cartservice';

export const LoadingStates = {
  NotStarted: 0,
  Loading: 1,
  OK: 2,
  Error: 3,
};

const GlobalContext = React.createContext<GlobalState>({
  quoteId: '',
  items: new Map(),
  itemSkus: [],
  productSkus: [],
  products: new Map(),
  addProducts: () => {},
  isProductsLoading: () => false,
  productsInProgress: new Set(),
  addItem: () => {},
  removeItem: () => {},
  clearItems: () => {},
  setItems: () => {},
  username: '',
  password: '',
  productsState: LoadingStates.NotStarted,
  setProductsRequestState: () => {},
  itemsState: LoadingStates.NotStarted,
  setItemsRequestState: () => {},
  addProductToInProgress: () => {},
  getCartProducts: () => [],
  removeProductFromInProgress: () => {},
});

export type GlobalState = {|
  quoteId: string,
  items: Map<string, CartItemType>,
  addProducts: (Product[]) => void,
  products: Map<string, Product>,
  isProductsLoading: () => boolean,
  itemSkus: string[],
  productSkus: string[],
  addProductToInProgress: Product => void,
  removeProductFromInProgress: Product => void,
  productsInProgress: Set<number>,
  addItem: CartItemType => void,
  removeItem: CartItemType => void,
  clearItems: () => void,
  setItems: (CartItemType[]) => void,
  username: string,
  password: string,
  productsState: LoadingState,
  productsState: LoadingState,
  setProductsRequestState: LoadingState => void,
  itemsState: LoadingState,
  setItemsRequestState: LoadingState => void,
  getCartProducts: () => Product[],
|};

export type LoadingState = $Values<typeof LoadingStates>;

export default GlobalContext;
