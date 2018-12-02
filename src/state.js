/**
 * @flow
 */

import React from 'react';
import Scenes from './scenes';
import type { Product, ProductUid } from './product';
import type { Scene } from './scenes';
import { Products } from './product';

export type State = {
  currentScreen: Scene,
  products: Product[],
  currentProductId: ProductUid,
};

export const state: State = {
  currentScreen: Scenes.Product,
  products: [
    {
      id: Products.Battery,
      name: 'Battery',
    },
    {
      id: Products.BigBattery,
      name: 'Big battery',
    },
    {
      id: Products.CircularSaw,
      name: 'Circular saw',
    },
    {
      id: Products.Computer,
      name: 'Computer',
    },
    {
      id: Products.Settings,
      name: 'Settings',
    },
    {
      id: Products.ControlPanel,
      name: 'Control panel',
    },
    {
      id: Products.Conveyor,
      name: 'Conveyor',
    },
    {
      id: Products.Truck,
      name: 'Truck',
    },
    {
      id: Products.ElectricTower,
      name: 'Electric tower',
    },
  ],
  currentProductId: Products.Truck,
};
