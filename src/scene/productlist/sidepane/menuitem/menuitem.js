/** @flow */

import { Text, TouchableHighlight, View } from 'react-native';
import style from './styles';
import React from 'react';

type MenuItemProps = {
  onMenuClick: () => void,
  menuItemName: string,
};

const MenuItem = ({ onMenuClick, menuItemName }: MenuItemProps) => {
  return (
    <TouchableHighlight onPress={onMenuClick} key={menuItemName}>
      <View style={style.product}>
        <Text numberOfLines={1} style={style.productText}>
          {menuItemName}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

export default MenuItem;
