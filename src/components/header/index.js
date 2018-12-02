/**
 * @flow
 */

import style from '../../scene/productlist/styles';
import React from 'react';
import { View } from 'react-native';

type HeaderProps = {
  chidren: Object
}

export const Header = ({ chidren, icon, text}:HeaderProps) => (
  <View style={style.header}>
    {icon}
    <Text style={header.text}>{text}</Text>
  </View>
);

