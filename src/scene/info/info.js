/**
 * @flow
 * */

import React from 'react';
import type { Node } from 'react';
import { View, FlatList } from 'react-native';
import style from './infostyles';
import type {
  NavigationScreenProp,
  NavigationScreenConfig,
} from 'react-navigation';
import type { Infoblock } from './infoblock';
import { getUid } from '../../lib/id';
import InfoItem from './infoitem/infoitem';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import Header from '../../components/header';
import Colors from '../../colors';
import NetworkWatcher from '../../components/networkwatcher/networkwatcher';
import DeviceInfo from 'react-native-device-info';

type InfoScreenProps = {
  navigation: NavigationScreenProp<void>,
};

type State = {
  infos: Infoblock[],
};

class InfoScreen extends React.PureComponent<InfoScreenProps, State> {
  static navigationOptions: NavigationScreenConfig<{
    headerStyle: ViewStyleProp,
  }> = {
    headerTitle: (
      <Header text={'Info'} icon={null} buttonBackIsPresent={true} />
    ),
    headerTitleStyle: {
      color: Colors.White,
    },
    headerStyle: {
      backgroundColor: Colors.EpamBlue,
      borderBottomWidth: 0,
    },
  };

  constructor(props: InfoScreenProps) {
    super(props);
    this.state = {
      infos: [
        {
          name: 'System',
          value: DeviceInfo.getSystemName()
        },
        {
          name: 'System version',
          value: DeviceInfo.getSystemVersion()
        },
        {
          name: 'User agent',
          value: DeviceInfo.getUserAgent()
        },
        {
          name: 'Timezone',
          value: DeviceInfo.getTimezone()
        },
      ],
    };
  }

  keyExtractor = (item: Infoblock, index: number) =>
    String(item.name) + getUid(item);

  render() {
    const { navigation } = this.props;
    return (
      <React.Fragment>
        <NetworkWatcher navigation={navigation}/>
        <View style={style.container}>
          <FlatList
            style={style.frame}
            data={this.state.infos}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderInfoItem}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderSeparator}
            ListFooterComponent={this.renderSeparator}
          />
        </View>
      </React.Fragment>
    );
  }

  renderInfoItem = ({ item }: { item: Infoblock }) => (
    <InfoItem info={item} />
  );

  renderSeparator() {
    return <View style={style.separator} />;
  }
}

export default InfoScreen;
