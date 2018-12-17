import { Image, Text, TouchableHighlight, View } from 'react-native';
import style from '../styles';
import { Icon, IconSizes } from '../../../icons';
import React from 'react';

const ProductItem = ({ onProductClick, product }: ProductItemProps) => {
  return (
    <TouchableHighlight onPress={onProductClick} key={product.id}>
      <View style={style.product}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
          }}
        >
          <View style={style.productIcon}>
            <Icon product={product.iconId} size={IconSizes.Small} />
          </View>
          <Text style={style.productText}>{product.name}</Text>
        </View>
        <View style={style.productAngle}>
          <Image
            style={{ width: 20, height: 20 }}
            source={require('./angle-arrow-pointing-to-right.png')}
          />
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ProductItem;