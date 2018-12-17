/**
 * @flow
 * */

import React from 'react';
import type { Node } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Image,
} from 'react-native';
import style from './styles';
import Colors from '../../colors';
import type { NavigationScreenProp, NavigationScreenConfig } from 'react-navigation';
import { StackActions, NavigationActions } from 'react-navigation';
import { Routes } from '../../routes';
import { Loader } from '../../components/loader';

type LoginScreenProps = {
  navigation: NavigationScreenProp<void>,
};

type State = {
  loading: boolean,
  username: string,
  password: string,
};

const AUTH_URL =
  'http://ecsc00a02fb3.epam.com/index.php/rest/V1/integration/customer/token';

async function mockResponse() {
  return await new Promise(res =>
    setTimeout(
      () => res({ ok: true, text: () => Promise.resolve('token') }),
      1000,
    ),
  );
}

async function getResponse(username, password) {
  return await fetch(AUTH_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
}

class LoginScreen extends React.PureComponent<LoginScreenProps, State> {
  static navigationOptions:NavigationScreenConfig<{header: null}> = {
    header: null,
  };

  constructor(props: LoginScreenProps) {
    super(props);
    this.state = {
      loading: false,
      username: '',
      password: '',
    };
  }

  render() {
    const { navigation } = this.props;
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
            value={this.state.username}
            onChangeText={username =>
              this.setState(prevState => ({ ...prevState, username }))
            }
          />
          <TextInput
            style={style.loginInput}
            textContentType={'password'}
            placeholder={'Password'}
            secureTextEntry
            selectionColor={Colors.BrightBlue}
            value={this.state.password}
            onChangeText={password =>
              this.setState(prevState => ({ ...prevState, password }))
            }
          />
          <TouchableOpacity
            style={style.loginButton}
            onPress={() =>
              this.onLoginClick(
                navigation,
                this.state.username,
                this.state.password,
              )
            }
          >
            <View style={style.loginBackground}>
              <Text style={style.loginText}>login</Text>
            </View>
          </TouchableOpacity>
        </View>
        {this.state.loading && (
          <Loader size={'large'} color={Colors.BrightBlue}/>
        )}
      </View>
    );
  }

  onLoginClick(
    navigation: NavigationScreenProp<void>,
    username: string,
    password: string,
  ) {
    if (this.state.loading) {
      return;
    }
    this.setState((prevState, props) => {
      this.sendRequest(navigation, username, password);
      return {
        ...prevState,
        loading: true,
      };
    });
  }

  async sendRequest(
    navigation: NavigationScreenProp<void>,
    username: string,
    password: string,
  ) {
    try {
      const response = await mockResponse();
      // const response = await getResponse(username, password);
      const responseIsOk = response.ok;
      if (!responseIsOk) {
        return this.handleRequestError(new Error('Response is not ok.'));
      }
      const token = await response.text();
      this.handleRequestSuccess();
    } catch (e) {
      this.handleRequestError(e);
    }
  }

  handleRequestSuccess() {
    this.setState((prevState, props) => {
      // TODO(alexk): we're navigating to product list without animation,
      // gonna fix it
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: Routes.ProductList }),
        ],
      });
      this.props.navigation.dispatch(resetAction);
      return {
        ...prevState,
        loading: false,
      };
    });
  }

  handleRequestError(e: Error) {
    console.log('Fetch error: ', e);
    this.setState((prevState, props) => {
      return {
        ...prevState,
        loading: false,
      };
    });
  }
}
export default LoginScreen;
