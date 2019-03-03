/** @flow */

import React from 'react';
import type { Product, ProductUid } from './product';

const GlobalContext = React.createContext<GlobalState>({
  items: new Map(),
  addItem: () => {},
  removeItem: () => {},
  clearItems: () => {},
  setItems: () => {},
});

export type GlobalState = {|
  items: Map<ProductUid, Product>,
  addItem: Product => void,
  removeItem: Product => void,
  clearItems: () => void,
  setItems: () => void,
|};

export default GlobalContext;
