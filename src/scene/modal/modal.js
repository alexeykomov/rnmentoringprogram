import { View, StyleSheet, Text } from 'react-native';
import React from 'react';

const ModalScreen = () => <View style={{...StyleSheet.absoluteFillObject,
  margin: 20,
  borderWidth: StyleSheet.hairlineWidth,
  borderRadius: 20,
}}>
  <Text>Error! You may retry once again</Text>
</View>;

export default ModalScreen;
