/** @flow */

import { Text, TouchableOpacity, View, Linking } from 'react-native';
import style from './styles';
import React from 'react';
import type { Credit } from '../credit';

type CreditItemProps = {
  credit: Credit,
};

const CreditItem = ({ credit }: CreditItemProps) => {
  return (
    <View style={style.credit}>
      <View>
        <Text style={style.creditText}>Icon made by </Text>
      </View>
      <TouchableOpacity onPress={() => Linking.openURL(credit.authorLink)}>
        <Text style={style.creditLink}>{credit.authorName}</Text>
      </TouchableOpacity>
      <View>
        <Text style={style.creditText}> from </Text>
      </View>
      <TouchableOpacity
        onPress={() => Linking.openURL('https://www.flaticon.com/')}
      >
        <Text style={style.creditLink}>www.flaticon.com</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CreditItem;
