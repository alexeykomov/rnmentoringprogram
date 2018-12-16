import Colors from '../../colors';
import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: Colors.WhiteTransparent,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default style;