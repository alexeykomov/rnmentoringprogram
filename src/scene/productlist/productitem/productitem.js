import { Image, Text, TouchableHighlight, View } from 'react-native';
import style from './styles';
import { Icon, IconSizes } from '../../../icons';
import React from 'react';

const ProductItem = ({ onProductClick, product }: ProductItemProps) => {
  return (
    <TouchableHighlight onPress={onProductClick} key={product.id}>
      <View style={style.product}>
        <View
          style={style.iconAndNameContainer}
        >
          <View style={style.productIcon}>
            <Icon product={product.iconId} size={IconSizes.Small} />
          </View>
          <Text numberOfLines={1} style={style.productText}>{product.name}</Text>
        </View>
        <View style={style.productAngle}>
          <Image
            style={style.productAngleIcon}
            source={require('./angle-arrow-pointing-to-right.png')}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ProductItem;