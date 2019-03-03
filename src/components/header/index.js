/**
 * @flow
 */

import style from './styles';
import React from 'react';
import { View, Text } from 'react-native';
import { Icon } from '../../icons';

type HeaderProps = {
  icon: typeof React.Element | null,
  text: string,
  buttonBackIsPresent: boolean,
};

export const Header = ({ icon, text, buttonBackIsPresent }: HeaderProps) => (
  <View
    style={[style.header].concat(
      !buttonBackIsPresent ? [style['header_noButtonBack']] : [],
    )}
  >
    {icon && <View style={style.iconContainer}>{icon}</View>}
    <Text numberOfLines={1} style={style.text}>
      {text}
    </Text>
  </View>
);

export default Header;
