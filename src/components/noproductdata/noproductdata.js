import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import style from './noproductdata.styles'

const NoProductData = () => <View style={style.container}>
  <Text style={style.label}>No data. Pull to refresh \/</Text>

</View>;

export default NoProductData;