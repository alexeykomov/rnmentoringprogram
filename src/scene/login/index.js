/**
 * @flow
 * */

import React from 'react';
import { View, TouchableHighlight, TextInput, Text } from 'react-native';
import style from 'app/scene/login/style';

type LoginScreenProps = {
  onLoginPress: () => void,
};

const LoginScreen = ({ onLoginPress }: LoginScreenProps) => (
  <View style={style}>
    <Text style={style.header}>Friday's shop</Text>
    <TextInput />
    <TextInput />
    <TouchableHighlight onPress={onLoginPress}>
      <Text style={style.login}>login</Text>
    </TouchableHighlight>
  </View>
);

export default LoginScreen;
