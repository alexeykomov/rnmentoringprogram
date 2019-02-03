/**
 * @flow
 * */

import type { Product } from '../../product';
import { View, StyleSheet, Alert, Linking } from 'react-native';
import React from 'react';
import { Icon, IconSizes } from '../../icons';
import { Header } from '../../components/header';
import type { NavigationScreenProp } from 'react-navigation';
import { Products } from '../../product';
import Colors from '../../colors';
import MapView, { Marker } from 'react-native-maps';
import NetworkWatcher from '../../components/networkwatcher/networkwatcher';

type LocationScreenProps = {
  navigation: NavigationScreenProp<*>,
};

const NonExistentProduct: Product = {
  id: Products.NonExistent,
  iconId: Products.NonExistent,
  name: "It seems you're browsing nonexistent or deleted product",
  history: '',
  location: { longitude: 0, latitude: 0 },
  telephone: '',
};

class LocationScreen extends React.PureComponent<LocationScreenProps> {
  static navigationOptions = ({ navigation }: LocationScreenProps) => {
    const product = navigation.getParam('product') || NonExistentProduct;
    return {
      headerTitleStyle: {
        color: Colors.White,
      },
      headerStyle: {
        backgroundColor: Colors.EpamBlue,
        borderBottomWidth: 0,
      },
      headerTitle: (
        <Header
          icon={<Icon product={product.iconId} size={IconSizes.Small} />}
          text={product.name}
          buttonBackIsPresent={true}
        />
      ),
    };
  };

  render() {
    const { navigation } = this.props;
    const product = navigation.getParam<product>('product', NonExistentProduct);
    const initialRegion = {
      latitude: product.location.latitude,
      longitude: product.location.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };

    return (
      <React.Fragment>
        <NetworkWatcher navigation={navigation} />
        <View style={StyleSheet.absoluteFillObject}>
          <MapView
            style={StyleSheet.absoluteFillObject}
            initialRegion={initialRegion}
          >
            <Marker
              onPress={() => this.onMarkerPress(product)}
              coordinate={product.location}
              title={product.name}
              description={product.telephone}
            />
          </MapView>
        </View>
      </React.Fragment>
    );
  }

  onMarkerPress = (product: Product) => {
    Alert.alert(
      'Call product provider',
      `Call ${product.telephone}`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            Linking.openURL(`tel:${product.telephone}`);
          },
        },
      ],
      { cancelable: false },
    );
  };
}

export default LocationScreen;
