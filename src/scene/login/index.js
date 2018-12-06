/**
 * @flow
 * */

import React from 'react';
import { View, TouchableOpacity, TextInput, Text, Image } from 'react-native';
import style from '../../scene/login/style';
import Colors from '../../colors';
import type { NavigationScreenProp } from 'react-navigation';
import { Routes } from '../../../App';

type LoginScreenProps = {
  onLoginPress: () => void,
  navigation: NavigationScreenProp<void>,
};

type State = {
  isLoading: boolean,
  tokenReceived: boolean,
};

class LoginScreen extends React.PureComponent<LoginScreenProps, State> {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { onLoginPress, navigation } = this.props;
    return (
      <View style={style.container}>
        <View style={style.headerBlock}>
          <Image source={require('./smiling.png')} style={style.greetIcon} />
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
          <TouchableOpacity
            style={style.loginButton}
            onPress={() => this.onLoginClick(navigation)}
          >
            <View style={style.loginBackground}>
              <Text style={style.loginText}>login</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  onLoginClick(navigation: NavigationScreenProp<void>) {
    this.setState((prevState, props) => ({
      ...prevState,

    }));
    navigation.navigate(Routes.ProductList);
  }
}
export default LoginScreen;
