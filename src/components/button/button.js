/** @flow */

import style from './styles';
import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

type ButtonProps = {
  onPress: () => void,
  caption: string,
};

const Button = ({ onPress, caption }: ButtonProps) => (
  <TouchableOpacity style={style.returnButton} onPress={onPress}>
    <View style={style.returnBackground}>
      <Text style={style.returnText}>{caption}</Text>
    </View>
  </TouchableOpacity>
);

export default Button;
