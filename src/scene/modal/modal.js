/** @flow */

import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import type { NavigationScreenProp } from 'react-navigation';
import Button from '../../components/button/button';
import style from './styles';

type ModalScreenProps = {
  navigation: NavigationScreenProp<void>,
};

class ModalScreen extends React.PureComponent<ModalScreenProps> {
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
          <Button
            caption={'Retry'}
            onPress={() => {
              retryAction();
              navigation.goBack();
            }}
          />
          <Button caption={'Close'} onPress={() => navigation.goBack()} />
        </View>
      </View>
    );
  }
}

export default ModalScreen;
