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
  setQuoteId: () => {},
  items: new Map(),
  products: new Map(),
  addProducts: () => {},
  isProductsLoading: () => false,
  isItemsLoading: () => false,
  isItemsLoaded: () => false,
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
  getProducts: () => [],
  removeProductFromInProgress: () => {},
});

export type GlobalState = {|
  quoteId: string,
  setQuoteId: (number) => void,
  items: Map<string, CartItemType>,
  addProducts: (Product[]) => void,
  products: Map<string, Product>,
  isProductsLoading: () => boolean,
  isItemsLoading: () => boolean,
  isItemsLoaded: () => boolean,
  addProductToInProgress: Product => void,
  removeProductFromInProgress: Product => void,
  productsInProgress: Set<string>,
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
  getProducts: () => Product[],
|};

export type LoadingState = $Values<typeof LoadingStates>;

export default GlobalContext;
