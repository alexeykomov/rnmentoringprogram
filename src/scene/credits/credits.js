/**
 * @flow
 * */

import React from 'react';
import type { Node } from 'react';
import { View, FlatList } from 'react-native';
import style from './styles';
import type {
  NavigationScreenProp,
  NavigationScreenConfig,
} from 'react-navigation';
import ProductItem from '../productlist/productitem/productitem';
import type { Credit } from './credit';
import type { Product } from '../../product';
import { getUid } from '../../lib/id';
import CreditItem from './credittitem/credititem';
import type { ViewStyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import Header from '../../components/header';
import Colors from '../../colors';

type CreditsScreenProps = {
  navigation: NavigationScreenProp<void>,
};

type State = {
  credits: Credit[],
};

class CreditsScreen extends React.PureComponent<CreditsScreenProps, State> {
  static navigationOptions: NavigationScreenConfig<{
    headerStyle: ViewStyleProp,
  }> = {
    headerTitle: (
      <Header
        text={'Credits'}
        icon={null}
        buttonBackIsPresent={true}
      />
    ),
    headerTitleStyle: {
      color: Colors.White,
    },
    headerStyle: {
      backgroundColor: Colors.EpamBlue,
      borderBottomWidth: 0,
    },
  };

  constructor(props: CreditsScreenProps) {
    super(props);
    this.state = {
      credits: [
        {
          name: 'Smiling free icon',
          authorName: 'Pixel perfect',
          authorLink: 'https://www.flaticon.com/authors/pixel-perfect',
        },
        {
          name: 'Menu button of three horizontal lines free icon',
          authorName: 'Freepik',
          authorLink: 'https://www.flaticon.com/authors/freepik',
        },
        {
          name: 'Battery free icon',
          authorName: 'itim2101',
          authorLink: 'https://www.flaticon.com/authors/itim2101',
        },
        {
          name: 'Battery free icon',
          authorName: 'itim2101',
          authorLink: 'https://www.flaticon.com/authors/itim2101',
        },{
          name: 'Circular saw free icon',
          authorName: 'itim2101',
          authorLink: 'https://www.flaticon.com/authors/itim2101',
        },{
          name: 'Computer free icon',
          authorName: 'itim2101',
          authorLink: 'https://www.flaticon.com/authors/itim2101',
        },{
          name: 'Settings free icon',
          authorName: 'itim2101',
          authorLink: 'https://www.flaticon.com/authors/itim2101',
        },{
          name: 'Conveyor free icon',
          authorName: 'itim2101',
          authorLink: 'https://www.flaticon.com/authors/itim2101',
        },{
          name: 'Truck free icon',
          authorName: 'itim2101',
          authorLink: 'https://www.flaticon.com/authors/itim2101',
        },{
          name: 'Electric tower free icon',
          authorName: 'itim2101',
          authorLink: 'https://www.flaticon.com/authors/itim2101',
        },
      ],
    };
  }

  keyExtractor = (item: Credit, index: number) => String(item.name) +
      getUid(item);

  render() {
    const { navigation } = this.props;
    return (
      <View style={style.container}>
        <FlatList
          style={style.frame}
          data={this.state.credits}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderProductItem}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderSeparator}
          ListFooterComponent={this.renderSeparator}
        />
      </View>
    );
  }

  renderProductItem = ({ item }: { item: Credit }) => (
    <CreditItem credit={item} />
  );

  renderSeparator() {
    return <View style={style.separator} />;
  }
}

export default CreditsScreen;
