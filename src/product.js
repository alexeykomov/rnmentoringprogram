/**
 * @flow
 * */

export const Products = {
  NonExistent: 0,
  Battery: 1,
  BigBattery: 2,
  CircularSaw: 3,
  Computer: 4,
  Settings: 5,
  ControlPanel: 6,
  Conveyor: 7,
  Truck: 8,
  ElectricTower: 9,
};

export type ProductUid = $Values<typeof Products>;

export type Product = {
  id: ProductUid,
  name: string,
  history: string,
  telephone: string,
  location: LatLng,
};


export type LatLng = {
  latitude: number,
  longitude: number,
}

/*   latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,*/