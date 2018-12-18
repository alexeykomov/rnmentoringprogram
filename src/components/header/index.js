/**
 * @flow
 */

import style from './styles';
import React from 'react';
import { View, Text } from 'react-native';

type HeaderProps = {
  icon: Object | null,
  text: string,
};

export const Header = ({ icon, text }: HeaderProps) => (
  <View style={style.header}>
    {icon && <View style={style.iconContainer}>{icon}</View>}
    <Text numberOfLines={1} style={style.text}>{text}</Text>
  </View>
);

export default Header;
