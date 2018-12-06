/**
 * @flow
 */

import React from 'react';
import type { Product } from '../../product';
import { Products } from '../../product';

export type State = {
  products: Product[],
};

export const state: State = {
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
};
