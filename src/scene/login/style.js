/**
 * @flow
 * */

import { StyleSheet } from 'react-native';
import Colors from '../../colors';

type LoginStyle = {
  header: Object,
  loginButton: Object,
  loginBackground: Object,
  loginText: Object,
  loginButton: Object,
  greetIcon: Object,
  loginInput: Object,
  container: Object,
  headerBlock: Object,
  inputBlock: Object,
};

const style: LoginStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerBlock: {
    flex: 0.8,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  inputBlock: { flex: 1.2, alignItems: 'center' },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    fontFamily: 'vincHand',
    color: Colors.Graphite,
  },
  loginButton: {
    width: 80,
    height: 30,
    marginTop: 10,
    marginBottom: 20,
  },
  loginBackground: {
    borderWidth: 2,
    borderRadius: 3,
    borderColor: Colors.EpamBlue,
    backgroundColor: Colors.EpamBlue,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'vincHand',
    color: Colors.White,
  },
  greetIcon: {
    marginTop: 50,
    width: 50,
    height: 50,
  },
  loginInput: {
    width: 280,
    height: 30,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 30,
    fontFamily: 'vincHand',
    color: Colors.Graphite,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 3,
    borderColor: Colors.EpamBlue,
  },
});

export default style;
