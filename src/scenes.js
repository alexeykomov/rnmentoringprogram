/**
 * Scenes.
 *
 * @format
 * @flow
 */

const Scenes = {
  Login: 0,
  Product: 1,
  ProductList: 2,
};

export type Screen = $Values<typeof Scenes>;

export default Scenes;
