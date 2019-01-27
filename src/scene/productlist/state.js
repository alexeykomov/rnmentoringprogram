/**
 * @flow
 */

import type { Product } from '../../product';

export type State = {
  products: Product[],
  loading: boolean,
  refreshing: boolean,
  currentPage: number,
  modalVisible: boolean,
  listOpacity: number,
};
