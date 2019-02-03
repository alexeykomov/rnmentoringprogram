/** @flow */

import { View, Text, Vibration } from 'react-native';
import React from 'react';
import type { NavigationScreenProp } from 'react-navigation';
import Button from '../../components/button/button';
import style from './styles';
import { noop } from '../../lib/noop';

type ModalScreenPropsType = {
  navigation: NavigationScreenProp<void>,
};

class ModalScreen extends React.PureComponent<ModalScreenPropsType> {
  componentDidMount() {
    Vibration.vibrate();
  }

  render() {
    const { navigation } = this.props;
    const error = navigation.getParam('error') || {};
    const retryAction = navigation.getParam('retryAction') || noop;
    return (
      <View style={style.modalContainer}>
        <View style={style.modalSubContainer}>
          <Text style={style.modalHeader}>Oops!</Text>
          <Text style={style.modalText}>{`You're encountering error: ${
            error.message
          }`}</Text>
          {retryAction !== noop ? (
            <Button
              caption={'Retry'}
              onPress={() => {
                retryAction();
                navigation.goBack();
              }}
            />
          ) : null}
          <Button caption={'Close'} onPress={this.onBackPress} />
        </View>
      </View>
    );
  }

  onBackPress = () => {
    const { navigation } = this.props;
    navigation.goBack();
  };
}

export default ModalScreen;
