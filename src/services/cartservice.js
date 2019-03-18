/**
 * @flow
 */

import type { Product } from '../product';
import mockCartResponse from '../../getcartresponse.json';
import type { GlobalState } from '../globalstate';
import { Sentry } from 'react-native-sentry';
import { getToken } from './authservice';
import RNRnmentoringprogramAsyncStorage from 'react-native-rnmentoringprogram-async-storage';
import { LoadingStates } from '../globalstate';
import { Routes } from '../routes';
import { getItemBySku } from './cartserviceutils';
import { delay } from '../lib/delay';

const PATH = 'http://ecsc00a02fb3.epam.com/index.php/rest/default/V1/';

export const getCart = async (
  context: GlobalState,
  shouldSetLoadingStatus: boolean,
  retryAction: Function,
  handleRequestError: (Error, Function) => void,
  handleRequestSuccess: () => void,
) => {
  try {
    if (shouldSetLoadingStatus) {
      context.setItemsRequestState(LoadingStates.Loading);
    }
    const getCartsResponse = await getCartRequest();
    // const getCartsResponse = await mockGetCartRequest();
    if (!getCartsResponse.ok) {
      context.setItemsRequestState(LoadingStates.Error);
      return handleRequestError(new Error('Response is not ok.'), retryAction);
    }
    const cart = await getCartsResponse.json();

    context.setItemsRequestState(LoadingStates.OK);
    context.setItems(cart.items);
    context.setQuoteId(cart.id);
    handleRequestSuccess();
  } catch (e) {
    Sentry.captureException(e);
    context.setItemsRequestState(LoadingStates.Error);
    return handleRequestError(e, retryAction);
  }
};

export const addProductToCart = async (
  product: Product,
  context: GlobalState,
  retryAction: Function,
  handleRequestError: (Error, Function) => void,
  handleRequestSuccess: (Product, GlobalState) => void,
) => {
  try {
    context.addProductToInProgress(product);
    if (context.itemsState !== LoadingStates.OK) {
      context.removeProductFromInProgress(product);
      return handleRequestError(new Error('Cart is not ready'), retryAction);
    }
    const response = await addItemRequest({
      product: product,
      quoteId: context.quoteId,
    });
    console.log('response: ', response);
    console.log('response.ok: ', response.ok);
    if (!response.ok) {
      context.removeProductFromInProgress(product);
      const responseBody = await response.json();
      return handleRequestError(
        new Error(
          'Response is not ok. ' +
            ('message' in responseBody ? responseBody.message : ''),
        ),
        retryAction,
      );
    }
    context.addItem(await response.json());
    context.removeProductFromInProgress(product);
    handleRequestSuccess(product, context);
  } catch (e) {
    console.log('e: ', e);
    Sentry.captureException(e);
    context.removeProductFromInProgress(product);
    return handleRequestError(e, retryAction);
  }
};

export const removeProductFromCart = async (
  product: Product,
  context: GlobalState,
  retryAction: Function,
  handleRequestError: (Error, Function) => void,
) => {
  try {
    context.addProductToInProgress(product);
    if (context.itemsState !== LoadingStates.OK) {
      context.removeProductFromInProgress(product);
      return handleRequestError(new Error('Cart is not ready'), retryAction);
    }
    const itemBySku = getItemBySku(context, product);
    if (!itemBySku) {
      context.removeProductFromInProgress(product);
      return handleRequestError(
        new Error('No item for this product'),
        retryAction,
      );
    }
    const response = await removeItemRequest({
      itemId: itemBySku.item_id,
    });
    if (!response.ok) {
      context.removeProductFromInProgress(product);
      return handleRequestError(new Error('Cart is not ready'), retryAction);
    }
    context.removeItem(itemBySku);
    context.removeProductFromInProgress(product);
  } catch (e) {
    Sentry.captureException(e);
    context.removeProductFromInProgress(product);
    return handleRequestError(e, retryAction);
  }
};

function wrapRequestWithAuthorization<I, T: { status: number }>(
  request: (string, I | void) => Promise<T>,
): I => Promise<T> {
  return async (input?: I) => {
    const token = await RNRnmentoringprogramAsyncStorage.getItem('token');
    const res = await request(token, input);
    console.log('res.status: ', res.status);
    if (res.status !== 401) {
      return res;
    }
    const [username, password] = await Promise.all([
      RNRnmentoringprogramAsyncStorage.getItem('username'),
      RNRnmentoringprogramAsyncStorage.getItem('password'),
    ]);
    const tokenResponse = await getToken(username, password);
    const newToken = await tokenResponse.json();
    await RNRnmentoringprogramAsyncStorage.setItem('token', newToken);
    return request(newToken, input);
  };
}

export const getCartRequest = wrapRequestWithAuthorization<
  void,
  GetCartsResponseType,
>(
  (token: string): Promise<GetCartsResponseType> => {
    return fetch(`${PATH}carts/mine/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  },
);

export const mockGetCartRequest = async (): Promise<GetCartsResponseType> => {
  await delay(3000);
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve(mockCartResponse),
  });
};

export const newCartRequest = wrapRequestWithAuthorization<
  void,
  CreateCartResponseType,
>(
  (token: string): Promise<CreateCartResponseType> => {
    return fetch(`${PATH}carts/mine`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  },
);

export const mockNewCartRequest = async (): Promise<CreateCartResponseType> => {
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve('4'),
  });
};

export const addItemRequest = wrapRequestWithAuthorization<
  AddItemInput,
  AddItemResponseType,
>(
  (token: string, input?: AddItemInput): Promise<AddItemResponseType> => {
    if (!input) {
      return Promise.reject(new Error('Specify input'));
    }
    return fetch(`${PATH}carts/mine/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cartItem: {
          sku: input.product.sku,
          qty: 1,
          quote_id: input.quoteId,
        },
      }),
    });
  },
);

export const mockAddItemRequest = async (): Promise<AddItemResponseType> => {
  return Promise.resolve({
    ok: true,
    status: 200,
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

export const removeItemRequest = wrapRequestWithAuthorization<
  RemoveItemInput,
  RemoveItemResponseType,
>(
  (token: string, input?: RemoveItemInput): Promise<RemoveItemResponseType> => {
    if (!input) {
      return Promise.reject(new Error('Specify input'));
    }
    return fetch(`${PATH}carts/mine/items/${input.itemId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  },
);

export const mockRemoveItemRequest = async (): Promise<RemoveItemResponseType> => {
  return Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve(true),
  });
};

export const getItemsRequest = wrapRequestWithAuthorization<
  null,
  GetItemsResponseType,
>(
  (token: string): Promise<GetItemsResponseType> => {
    return fetch(`${PATH}carts/mine/items`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  },
);

export const mockGetItemsRequest = async (): Promise<GetItemsResponseType> => {
  return Promise.resolve({
    ok: true,
    status: 200,
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

type RemoveItemInput = {|
  itemId: number,
|};

type RemoveItemResponseType = {|
  ok: boolean,
  status: number,
  json: () => Promise<boolean>,
|};

type GetCartsResponseType = {|
  ok: boolean,
  status: number,
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
|};

type CreateCartResponseType = {|
  ok: boolean,
  status: number,
  json: () => Promise<string>,
|};

export type CartItemType = {|
  item_id: number,
  sku: string,
  qty: number,
  name: string,
  product_type: string,
  quote_id: string,
|};

type AddItemInput = {|
  product: Product,
  quoteId: string,
|};

type AddItemResponseType =
  | AddItemResponseSuccessType
  | AddItemResponseFailedType;

type AddItemResponseSuccessType = {|
  ok: true,
  status: number,
  json: () => Promise<CartItemType>,
|};

type AddItemResponseFailedType = {|
  ok: false,
  status: number,
  json: () => Promise<{ message: string }>,
|};

type GetItemsResponseType = {|
  ok: boolean,
  status: number,
  json: () => Promise<Array<CartItemType>>,
|};
