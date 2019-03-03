/**
 * @flow
 */

import type { Product } from '../../product';

const PATH = '${PATH}';

export const getCartsRequest = async (
  token: string,
  quoteId: string,
): GetCartsResponseType => {
  return fetch(`${PATH}carts/mine/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const mockGetCartsRequest = async (): GetCartsResponseType => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(['4']),
  });
};

export const createCartRequest = (token: string): CreateCartResponseType => {
  return fetch(`${PATH}carts/mine`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const mockCreateCartRequest = async (): DeleteCartResponseType => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve('4'),
  });
};

export const deleteCartRequest = (
  token: string,
  quoteId: string,
): DeleteCartResponseType => {
  return fetch(`${PATH}carts/mine?quoteId=${quoteId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const mockDeleteCartRequest = async (): CreateCartResponseType => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve('4'),
  });
};

export const addItemRequest = (
  token: string,
  item: Product,
  quoteId: string,
): AddItemResponseType => {
  return fetch(`${PATH}carts/mine/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      cartItem: {
        sku: item.sku,
        qty: 1,
        quote_id: quoteId,
      },
    }),
  });
};

export const mockAddItemRequest = async (): AddItemResponseType => {
  return Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        item_id: 7,
        sku: 'WS12-M-Orange',
        qty: 1,
        name: 'Radiant Tee-M-Orange',
        product_type: 'simple',
        quote_id: '4',
      }),
  });
};

export const removeItemRequest = (
  token: string,
  item: Product,
  quoteId: string,
): RemoveItemResponseType => {
  return fetch(`${PATH}carts/mine/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      cartItem: {
        sku: item.sku,
        qty: 1,
        quote_id: quoteId,
      },
    }),
  });
};

export const mockRemoveItemRequest = async (): RemoveItemResponseType => {
  return Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        item_id: 7,
        sku: 'WS12-M-Orange',
        qty: 1,
        name: 'Radiant Tee-M-Orange',
        product_type: 'simple',
        quote_id: '4',
      }),
  });
};

export const getItemsRequest = async (
  token: string,
  quoteId: string,
): GetItemsResponseType => {
  return fetch(`${PATH}carts/mine/items?quoteId=${quoteId}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};

export const mockGetItemsRequest = async (): GetItemsResponseType => {
  return Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        {
          item_id: 7,
          sku: 'WS12-M-Orange',
          qty: 1,
          name: 'Radiant Tee-M-Orange',
          product_type: 'simple',
          quote_id: '4',
        },
      ]),
  });
};

type RemoveItemResponseType = Promise<{
  ok: boolean,
  json: () => Promise<Array<string>>,
}>;

type GetCartsResponseType = Promise<{
  ok: boolean,
  json: () => Promise<Array<string>>,
}>;

type CreateCartResponseType = Promise<{
  ok: boolean,
  json: () => Promise<string>,
}>;

type DeleteCartResponseType = Promise<{
  ok: boolean,
  json: () => Promise<string>,
}>;

type AddItemResponseType = Promise<{
  ok: boolean,
  json: () => Promise<{|
    item_id: number,
    sku: string,
    qty: number,
    name: string,
    product_type: string,
    quote_id: string,
  |}>,
}>;

type GetItemsResponseType = Promise<{
  ok: boolean,
  json: () => Promise<
    Array<{|
      item_id: number,
      sku: string,
      qty: number,
      name: string,
      product_type: string,
      quote_id: string,
    |}>,
  >,
}>;
