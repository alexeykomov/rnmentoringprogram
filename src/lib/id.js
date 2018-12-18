import { Products } from '../product';

/**
 * @flow
 * */

let uid = 0;

export const getUid = () => {
  return uid++;
};

export const getRandomProductId = () => {
  const realProducts = Object.values(Products).filter(
    product => product !== Products.NonExistent,
  );
  /* NOTE(alexk): This is to persuade Flow that we indeed return ProductUid. */
  switch (Math.floor(Math.random() * (realProducts.length - 1))) {
    case 0:
      return Products.Battery;
    case 1:
      return Products.BigBattery;
    case 2:
      return Products.CircularSaw;
    case 3:
      return Products.Computer;
    case 4:
      return Products.ControlPanel;
    case 5:
      return Products.Conveyor;
    case 6:
      return Products.ElectricTower;
    case 7:
      return Products.Settings;
    default:
      return Products.Truck;
  }
};