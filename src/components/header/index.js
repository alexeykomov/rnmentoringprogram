/**
 * @flow
 */

import style from './styles';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Colors from '../../colors';

type HeaderProps = {
  icon: Object | null,
  text: string,
  buttonBackIsPresent: boolean,
  onMenuPress: () => void,
};

export const Header = ({ icon, text, buttonBackIsPresent, onMenuPress }: HeaderProps) => (
  <View
    style={[style.header].concat(
      !buttonBackIsPresent ? [style['header_noButtonBack']] : [],
    )}
  >
    {!buttonBackIsPresent && <View>
      <TouchableOpacity onPress={onMenuPress}>
      <Image
        source={require('../../icons/menu-button-of-three-horizontal-lines.png')}
        style={{ width: 20, height: 20, tintColor: Colors.White, marginLeft: 10, }}
      />
      </TouchableOpacity>
    </View>}
    <View>
      {icon && <View style={style.iconContainer}>{icon}</View>}
      <Text numberOfLines={1} style={style.text}>
        {text}
      </Text>
    </View>
    <View />
  </View>
);

export default Header;
