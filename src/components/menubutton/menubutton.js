import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import style from './styles';

type MenuButtonProps = {
  onPress: () => void,
};

const MenuButton = ({ onPress }: MenuButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    hitSlop={{ top: 20, left: 20, right: 40, bottom: 10 }}
  >
    <Image
      source={require('../../icons/menu-button-of-three-horizontal-lines.png')}
      style={style.icon}
    />
  </TouchableOpacity>
);

export default MenuButton;
