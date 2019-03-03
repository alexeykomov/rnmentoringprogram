/**
 * @flow
 */

import type { ProductUid } from '../product';
import { Products } from '../product';
import { Image } from 'react-native';
import React from 'react';

type IconProps = {
  product: ProductUid,
  size: IconSize,
};

const getImageByProduct = (product: ProductUid) => {
  switch (product) {
    case Products.Battery:
      return require('./001-battery.png');
    case Products.BigBattery:
      return require('./002-battery-1.png');
    case Products.CircularSaw:
      return require('./003-circular-saw.png');
    case Products.Computer:
      return require('./004-computer.png');
    case Products.Settings:
      return require('./005-settings.png');
    case Products.ControlPanel:
      return require('./006-control-panel.png');
    case Products.Conveyor:
      return require('./007-conveyor.png');
    case Products.Truck:
      return require('./008-truck.png');
    case Products.ElectricTower:
      return require('./009-electric-tower.png');
    default:
      return null;
  }
};

export const IconSizes = {
  Small: 0,
  Big: 1,
};

export const IconSizeStyles = {
  [IconSizes.Small]: { width: 30, height: 30 },
  [IconSizes.Big]: { width: 40, height: 40 },
};

export type IconSize = $Values<typeof IconSizes>;

export const Icon = ({ product, size }: IconProps) => (
  <Image style={IconSizeStyles[size]} source={getImageByProduct(product)} />
);
