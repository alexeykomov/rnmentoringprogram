import { StyleSheet, View, Text } from 'react-native';
import React from 'react';
import { NavigationScreenProp } from 'react-navigation';
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
        <Text style={style.modalHeader}>Oops!</Text>
        <Text style={style.modalText}>{`You're encountering network error: ${error.message}`}</Text>
        <Button
          caption={'Retry'}
          onPress={() => {
            retryAction();
            navigation.goBack();
          }}
        />
        <Button caption={'Close'} onPress={() => navigation.goBack()} />
      </View>
    );
  }
}

export default ModalScreen;
