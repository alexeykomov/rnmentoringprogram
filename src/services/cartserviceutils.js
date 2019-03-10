// @flow

import type { GlobalState } from '../globalstate';
import type { Product } from '../product';
import type { CartItemType } from './cartservice';

export const getItemBySku = (context: GlobalState, product: Product) => {
  return context.items.get(product.sku);
};
