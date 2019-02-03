import { Text, View } from 'react-native';
import style from './styles';
import React from 'react';
import type { InfoBlock } from '../infoblock';

type InfoItemProps = {
  info: InfoBlock,
};

const InfoItem = ({ info }: InfoItemProps) => {
  return (
    <View style={style.info}>
      <View>
        <Text style={style.infoNameText}>{info.name}</Text>
      </View>
      <View>
        <Text style={style.infoValueText}>{info.value}</Text>
      </View>

    </View>
  );
};

export default InfoItem;
