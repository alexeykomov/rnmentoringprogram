/**
 * @flow
 * */

import React from 'react';
import { View, TouchableOpacity, TextInput, Text, Image } from 'react-native';
import style from '../../scene/login/style';
import Colors from '../../colors';

type LoginScreenProps = {
  onLoginPress: () => void,
};

const LoginScreen = ({ onLoginPress }: LoginScreenProps) => (
  <View style={style.container}>
    <View
      style={style.headerBlock}
    >
      <Image
        source={require('./smiling.png')}
        style={style.greetIcon}
      />
      <Text style={style.header}>Friday's shop</Text>
    </View>
    <View style={style.inputBlock}>
      <TextInput
        style={style.loginInput}
        textContentType={'emailAddress'}
        placeholder={'E-mail'}
        selectionColor={Colors.BrightBlue}
      />
      <TextInput
        style={style.loginInput}
        textContentType={'password'}
        placeholder={'Password'}
        secureTextEntry
        selectionColor={Colors.BrightBlue}
      />
      <TouchableOpacity style={style.loginButton} onPress={onLoginPress}>
        <View style={style.loginBackground}>

          <Text style={style.loginText}>login</Text>
        </View>
      </TouchableOpacity>
    </View>
  </View>
);

export default LoginScreen;
