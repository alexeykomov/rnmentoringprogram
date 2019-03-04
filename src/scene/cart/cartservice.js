/**
 * @flow
 */

import type { Product } from '../../product';
import mockCartResponse from '../../../getcartresponse.json';

const PATH = 'http://ecsc00a02fb3.epam.com/rest/V1/';

export const getCartRequest = async (
  token: string,
): GetCartsResponseType => {
  return fetch(`${PATH}carts/mine/`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const mockGetCartRequest = async (): GetCartsResponseType => {
  return Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockCartResponse),
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

export const addItemRequest = (
  token: string,
  product: Product,
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
        sku: product.sku,
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
  item: CartItemType,
): RemoveItemResponseType => {
  return fetch(`${PATH}carts/mine/items/${item.item_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
};

export const mockRemoveItemRequest = async (): RemoveItemResponseType => {
  return Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve(true),
  });
};

export const getItemsRequest = async (
  token: string,
): GetItemsResponseType => {
  return fetch(`${PATH}carts/mine/items`, {
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
  json: () => Promise<boolean>,
}>;

type GetCartsResponseType = Promise<{
  ok: boolean,
  json: () => Promise<{|
    id: number,
    created_at: string,
    updated_at: string,
    is_active: boolean,
    is_virtual: boolean,
    items: CartItemType[],
    items_count: number,
    items_qty: number,
    customer: {
      id: number,
      group_id: number,
      created_at: string,
      updated_at: string,
      created_in: string,
      email: string,
      firstname: string,
      lastname: string,
      store_id: number,
      website_id: number,
      addresses: [],
      disable_auto_group_change: number,
      extension_attributes: { is_subscribed: boolean },
    },
    billing_address: {
      id: number,
      region: string | null,
      region_id: string | null,
      region_code: string | null,
      country_id: string | null,
      street: [''],
      telephone: string | null,
      postcode: string | null,
      city: string | null,
      firstname: string | null,
      lastname: string | null,
      customer_id: number,
      email: string,
      same_as_billing: number,
      save_in_address_book: number,
    },
    orig_order_id: number,
    currency: {
      global_currency_code: string,
      base_currency_code: string,
      store_currency_code: string,
      quote_currency_code: string,
      store_to_base_rate: number,
      store_to_quote_rate: number,
      base_to_global_rate: number,
      base_to_quote_rate: number,
    },
    customer_is_guest: boolean,
    customer_note_notify: boolean,
    customer_tax_class_id: number,
    store_id: number,
    extension_attributes: { shipping_assignments: [] },
  |}>,
}>;

type CreateCartResponseType = Promise<{
  ok: boolean,
  json: () => Promise<string>,
}>;

type DeleteCartResponseType = Promise<{
  ok: boolean,
  json: () => Promise<string>,
}>;

type CartItemType = {|
  item_id: number,
  sku: string,
  qty: number,
  name: string,
  product_type: string,
  quote_id: string,
|};

type AddItemResponseType = Promise<{
  ok: boolean,
  json: () => Promise<CartItemType>,
}>;

type GetItemsResponseType = Promise<{
  ok: boolean,
  json: () => Promise<
    Array<CartItemType>,
  >,
}>;
