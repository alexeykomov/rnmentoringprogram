/**
 * @flow
 */

import type { ProductUid } from 'app/product';
import { Products } from 'app/product';
import { Image } from 'react-native';
import React from 'react';

type IconProps = {
  product: ProductUid,
  size: number;
};

export const Icon = ({ product: ProductUid }: IconProps) => (
  <Image source={require('./001-battery.png')} />
);
