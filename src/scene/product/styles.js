/**
 * @flow
 * */

import { StyleSheet } from 'react-native';
import Colors from '../../colors';

const style = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    height: 110,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: Colors.EpamBlue,
  },
  headerText: {
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: 'vincHand',
    color: Colors.White,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: Colors.White,
  },
  productText: {
    fontFamily: 'vincHand',
    color: Colors.Graphite,
    fontSize: 22,
    padding: 20,
  },
  productTextContainer: {
  },
  returnButton: { marginLeft: 20, marginRight: 20, width: 200, height: 40 },
  returnBackground: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 3,
    borderColor: Colors.EpamBlue,
    backgroundColor: Colors.EpamBlue,
  },
  returnText: {
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 40,
    fontFamily: 'vincHand',
    color: Colors.White,
  },
});

export default style;
