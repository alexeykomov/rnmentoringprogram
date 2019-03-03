/**
 * @flow
 */

import type { Product } from '../../product';

export const getCartsRequest = async (
  quoteId: string,
): GetItemsResponseType => {
  return fetch(
    `http://ecsc00a02fb3.epam.com/rest/default/V1/carts/mine/`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
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

export const createCartRequest = (): CreateCartResponseType => {
  return fetch(`http://ecsc00a02fb3.epam.com/rest/default/V1/carts/mine`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer q0u66k8h42yaevtchv09uyy3y9gaj2ap',
    },
  });
};

export const mockCreateCartRequest = async (): CreateCartResponseType => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve('4'),
  });
};

export const addItemRequest = (item: Product, quoteId: string) => {
  return fetch(
    `http://ecsc00a02fb3.epam.com/rest/default/V1/carts/mine/items`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cartItem: {
          sku: item.sku,
          qty: 1,
          quote_id: quoteId,
        },
      }),
    },
  );
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

export const getItemsRequest = async (
  quoteId: string,
): GetItemsResponseType => {
  return fetch(
    `http://ecsc00a02fb3.epam.com/rest/default/V1/carts/mine/items?quoteId=${quoteId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
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

type CreateCartResponseType = Promise<{
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
