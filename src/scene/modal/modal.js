/** @flow */

import { StyleSheet, View, Text, Vibration } from 'react-native';
import React from 'react';
import type { NavigationScreenProp } from 'react-navigation';
import Button from '../../components/button/button';
import style from './styles';
import { noop } from '../../lib/noop';

type ModalScreenProps = {
  navigation: NavigationScreenProp<void>,
};

class ModalScreen extends React.PureComponent<ModalScreenProps> {
  componentDidMount() {
    Vibration.vibrate();
  }

  render() {
    const { navigation } = this.props;
    const error = navigation.getParam('error', {});
    const retryAction = navigation.getParam('retryAction', () => {});
    return (
      <View style={style.modalContainer}>
        <View style={style.modalSubContainer}>
          <Text style={style.modalHeader}>Oops!</Text>
          <Text style={style.modalText}>{`You're encountering error: ${
            error.message
          }`}</Text>
          {retryAction !== noop ? <Button
            caption={'Retry'}
            onPress={() => {
              retryAction();
              navigation.goBack();
            }}
          /> : null}
          <Button caption={'Close'} onPress={() => navigation.goBack()} />
        </View>
      </View>
    );
  }
}

export default ModalScreen;
