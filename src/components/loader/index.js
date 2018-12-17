/** @flow */

import style from './styles';
import { ActivityIndicator, View } from 'react-native';
import React from 'react';
import type { Color } from '../../colors';

export type IndicatorSize = number | 'small' | 'large';

export type LoaderProps = {
  size: IndicatorSize,
  color: Color,
};

export const Loader = ({size, color}: LoaderProps) => (
  <View style={style.loaderContainer}>
    <ActivityIndicator
      animating={true}
      size={size}
      color={color}
    />
  </View>);