/**
 * @flow
 * */

import type { Product } from '../../product';
import { getRandomProductId } from '../../lib/id';

export const formatProducts = (
  productsApiResponse: ProductApiResponse,
): Product[] => {
  return productsApiResponse.items.map(productItem => {
    const description = productItem.custom_attributes.find(
      customAttribute => customAttribute.attribute_code === 'description',
    );
    const name = productItem.name;
    const history = description ? description.value : name;
    return {
      id: productItem.id,
      name,
      history,
      iconId: getRandomProductId(),
      telephone: '+375111111111',
      location: {
        latitude: 53.9480826,
        longitude: 27.7105363,
      },
    };
  });
};

export type ProductApiResponse = {
  items: ProductItem[],
};

type AttributeCodes =
  | 'url_key'
  | 'msrp_display_actual_price_type'
  | 'required_options'
  | 'has_options'
  | 'meta_title'
  | 'meta_keyword'
  | 'meta_description'
  | 'tax_class_id'
  | 'quantity_and_stock_status'
  | 'category_ids'
  | 'description';

type CustomAttribute = {
  attribute_code: AttributeCodes,
  value: string,
};

type ProductLink = {
  sku: string,
  link_type: string,
  linked_product_sku: string,
  linked_product_type: string,
  position: Object,
};

type ProductItem = {
  id: number,
  sku: string,
  name: string,
  attribute_set_id: number,
  price: number,
  status: number,
  visibility: number,
  type_id: string,
  created_at: string,
  updated_at: string,
  product_links: ProductLink[],
  tier_prices: Object[],
  custom_attributes: CustomAttribute[],
};
