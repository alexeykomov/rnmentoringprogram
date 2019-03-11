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
import { formatProducts } from '../scene/productlist/producttransform';
import { LayoutAnimation } from 'react-native';
import type { ProductApiResponse } from '../scene/productlist/producttransform';
import obj from '../../response';
import { getUid } from '../lib/id';
import { delay } from '../lib/delay';

const PAGE_SIZE = 20;

export const INITIAL_PAGE = 1;

export const getProducts = async (
  context: GlobalState,
  shouldSetLoadingStatus: boolean,
  page: number,
  retryAction: Function,
  handleRequestError: (Error, Function) => void,
  handleRequestSuccess: number => void,
) => {
  try {
    if (shouldSetLoadingStatus) {
      context.setProductsRequestState(LoadingStates.Loading);
    }
    const response = await mockGetProductsRequest(PAGE_SIZE, page);
    // const response = await getProductsRequest(PAGE_SIZE, page);
    const responseIsOk = response.ok;
    if (!responseIsOk) {
      context.setProductsRequestState(LoadingStates.Error);
      return handleRequestError(new Error('Response is not ok.'), retryAction);
    }
    const products = formatProducts(await response.json());
    console.log('products: ', products);
    context.addProducts(products);
    context.setProductsRequestState(LoadingStates.OK);
    handleRequestSuccess(page);
  } catch (e) {
    context.setProductsRequestState(LoadingStates.Error);
    Sentry.captureException(e);
    handleRequestError(e, retryAction);
  }
};

const getProductsRequest = (
  pageSize: number,
  currentPage: number,
): Promise<GetProductsResponseType> => {
  return fetch(
    `http://ecsc00a02fb3.epam.com/rest/V1/products?searchCriteria[pageSize]=${pageSize}&searchCriteria[currentPage]=${currentPage}`,
    {
      method: 'GET',
    },
  );
};

let mockRequestCounter = 0;

const mockGetProductsRequest = async (
  pageSize: number,
  page: number,
): Promise<GetProductsResponseType> => {
  await delay(1000);
  return Promise.resolve({
    ok: true,
    json: () => {
      const newItems = obj.items.map(i => ({
        ...i,
        sku: i.sku + mockRequestCounter++,
      }));
      return Promise.resolve({ ...obj, items: newItems });
    },
  });
};

type GetProductsResponseType = {
  ok: boolean,
  json: () => Promise<ProductApiResponse>,
};
