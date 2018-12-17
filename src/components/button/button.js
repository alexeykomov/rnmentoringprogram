import style from './styles';
import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const Button = ({ onPress, caption }) => (
  <TouchableOpacity style={style.returnButton} onPress={onPress}>
    <View style={style.returnBackground}>
      <Text style={style.returnText}>{caption}</Text>
    </View>
  </TouchableOpacity>
);

export default Button;
