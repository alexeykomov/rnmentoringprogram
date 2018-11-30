/**
 * @flow
 * */

import { StyleSheet } from 'react-native';
import Colors from 'app/colors';

type LoginStyle = {
  header: Object,
  login: Object,
  greetIcon: Object,
}

const style: LoginStyle = StyleSheet.create({
  header: {
    fontSize: 20,
    fontFamily: 'vincHand',
    color: Colors.Graphite,
  },
  login: {
    fontFamily: 'vincHand',
    color: Colors.Graphite,
  },
  greetIcon: {},
});

export default style;
