/**
 * @flow
 * */

import React from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Animated,
  Vibration,
} from 'react-native';
import style from './styles';
import Colors from '../../colors';
import type {
  NavigationScreenProp,
  NavigationScreenConfig,
} from 'react-navigation';
import { StackActions, NavigationActions } from 'react-navigation';
import { Routes } from '../../routes';
import { Loader } from '../../components/loader';
import type { CompositeAnimation } from 'react-native/Libraries/Animated/src/AnimatedImplementation';
import NetworkWatcher from '../../components/networkwatcher/networkwatcher';
import SplashScreen from 'react-native-splash-screen';
import LottieView from 'lottie-react-native';
import RNRnmentoringprogramAsyncStorage from 'react-native-rnmentoringprogram-async-storage';
import { Sentry } from 'react-native-sentry';

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

const HOW_MANY_TIMES_TO_PLAY = 2;

class LoginScreen extends React.PureComponent<LoginScreenProps, State> {
  static navigationOptions: NavigationScreenConfig<{ header: null }> = {
    header: null,
  };

  inputBlockX = new Animated.Value(0);

  smilingStackAnimation: typeof LottieView = null;

  playedTimes = 0;

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
    this.playedTimes = 0;
    this.smilingStackAnimation && this.smilingStackAnimation.play();

    try {
      const token = await RNRnmentoringprogramAsyncStorage.getItem('token');
      if (token) {
        return this.navigateToContent();
      }
      SplashScreen.hide();
    } catch (error) {
      Sentry.captureException(error);
      console.log('Error retrieving token from AsyncStorage: ', error);
      SplashScreen.hide();
    }
  }

  saveRef = (ref: typeof LottieView) => {
    this.smilingStackAnimation = ref;
  };

  onSmilingStackAnimationFinish = () => {
    this.playedTimes++;

    if (this.playedTimes >= HOW_MANY_TIMES_TO_PLAY) {
      return;
    }

    this.smilingStackAnimation.play();
  };

  render() {
    const { navigation } = this.props;
    return (
      <React.Fragment>
        <NetworkWatcher navigation={navigation} />
        <View style={style.container}>
          <View style={style.headerBlock}>
            <LottieView
              ref={this.saveRef}
              source={require('./1309-smiley-stack.json')}
              style={style.greetIcon}
              loop={false}
              onAnimationFinish={this.onSmilingStackAnimationFinish}
            />
            <Text style={style.header}>{"Friday's shop"}</Text>
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
      </React.Fragment>
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
      const response = await this.mockResponse();
      // const response = await this.getResponse(username, password);
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
      Sentry.captureException(e);
      this.handleRequestError(e, retryAction);
    }
  }

  async saveLoginToken(token: string) {
    try {
      await RNRnmentoringprogramAsyncStorage.setItem('token', token);
    } catch (error) {
      Sentry.captureException(error);
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

  async mockResponse() {
    return await new Promise(res =>
      setTimeout(
        () => res({ ok: true, text: () => Promise.resolve('token') }),
        1000,
      ),
    );
  }

  async getResponse(username: string, password: string) {
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
}

const getDeltaByStep = (index: number, elements: null[]) => {
  return index === elements.length - 1
    ? 0
    : (20 / (index + 1)) * (index % 2 === 0 ? -1 : 1);
};

export default LoginScreen;
