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
  Animated,
  AsyncStorage,
  Vibration,
} from 'react-native';
import style from './styles';
import Colors from '../../colors';
import type {
  NavigationScreenProp,
  NavigationScreenConfig,
} from 'react-navigation';
import {
  StackActions,
  NavigationActions,
  NavigationEvents,
} from 'react-navigation';
import { Routes } from '../../routes';
import { Loader } from '../../components/loader';
import type { CompositeAnimation } from 'react-native/Libraries/Animated/src/AnimatedImplementation';

type LoginScreenProps = {
  navigation: NavigationScreenProp<void>,
};

type State = {
  loading: boolean,
  username: string,
  password: string,
  error: boolean,
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

async function getResponse(username: string, password: string) {
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
  static navigationOptions: NavigationScreenConfig<{ header: null }> = {
    header: null,
  };

  inputBlockX = new Animated.Value(0);

  constructor(props: LoginScreenProps) {
    super(props);
    this.state = {
      loading: false,
      username: '',
      password: '',
      error: false,
    };
  }

  getAnimatedSequence = (): CompositeAnimation[] => {
    return new Array(10)
      .fill(null)
      .map((el: null, index: number, elements: null[]) => {
        const value = getDeltaByStep(index, elements);
        return Animated.timing(this.inputBlockX, {
          toValue: value,
          duration: 50,
          useNativeDriver: true,
        });
      });
  };

  componentDidUpdate(prevProps: LoginScreenProps, prevState: State) {
    if (this.state.error) {
      Vibration.vibrate();
      Animated.sequence(this.getAnimatedSequence()).start(() => {
        this.setState(prevState => ({ ...prevState, error: false }));
      });
    }
  }

  async componentDidMount() {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
        this.navigateToContent();
      }
    } catch (error) {
      console.log('Error retrieving token from AsyncStorage: ', error);
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={style.container}>
        <View style={style.headerBlock}>
          <Image source={require('./smiling.png')} style={style.greetIcon} />
          <Text style={style.header}>Friday's shop</Text>
        </View>
        <Animated.View
          style={[
            style.inputBlock,
            {
              transform: [{ translateX: this.inputBlockX }],
            },
          ]}
        >
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
        </Animated.View>
        {this.state.loading && (
          <Loader size={'large'} color={Colors.BrightBlue} />
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
      this.sendRequest(navigation, username, password, () =>
        this.onLoginClick(navigation, username, password),
      );
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
    retryAction: Function,
  ) {
    try {
      const response = await mockResponse();
      // const response = await getResponse(username, password);
      const responseIsOk = response.ok;
      if (!responseIsOk) {
        return this.handleRequestError(
          new Error('Response is not ok.'),
          retryAction,
        );
      }
      const token = await response.text();
      await this.saveLoginToken(token);
      this.handleRequestSuccess();
    } catch (e) {
      this.handleRequestError(e, retryAction);
    }
  }

  async saveLoginToken(token: string) {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      console.log("Error - token wasn't saved: ", error);
    }
  }

  handleRequestSuccess() {
    this.setState((prevState, props) => {
      // TODO(alexk): we're navigating to product list without animation,
      // gonna fix it
      this.navigateToContent();
      return {
        ...prevState,
        loading: false,
      };
    });
  }

  navigateToContent() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: Routes.ProductList })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  handleRequestError(e: Error, retryAction: Function) {
    const { navigation } = this.props;

    console.log('Fetch error: ', e);
    this.setState((prevState, props) => {
      return {
        ...prevState,
        loading: false,
        error: true,
        username: '',
        password: '',
      };
    });
  }
}

const getDeltaByStep = (index: number, elements: null[]) => {
  return index === elements.length - 1
    ? 0
    : (20 / (index + 1)) * (index % 2 === 0 ? -1 : 1);
};

export default LoginScreen;
