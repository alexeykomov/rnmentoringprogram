import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Colors from '../../../colors';
import React from 'react';
import MenuItem from './menuitem/menuitem';

type SidePaneProps = {
  onCreditsSelect: () => void,
};

type SidePaneState = {
  modalVisible: boolean,
};

const SIDE_PANE_WIDTH = 300;

class SidePane extends React.PureComponent<SidePaneProps, SidePaneState> {
  menuX = new Animated.Value(-SIDE_PANE_WIDTH);

  menuFade = new Animated.Value(0);

  constructor() {
    super();
    this.state = {
      modalVisible: false,
    };
  }

  render() {
    return (
      <Modal transparent={true} visible={this.state.modalVisible}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            opacity: this.menuFade,
            backgroundColor: 'black',
          }}
        >
          <TouchableOpacity
            style={StyleSheet.absoluteFillObject}
            onPress={this.onHighlightPress}
          />
        </Animated.View>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            width: SIDE_PANE_WIDTH,
            transform: [{ translateX: this.menuX }],
            borderRightWidth: 1,
            borderRightColor: Colors.EpamBlue,
            backgroundColor: Colors.White,
          }}
        >
          <View style={{ backgroundColor: Colors.EpamBlue, height: 100 }} />
          <ScrollView>
            <MenuItem
              menuItemName={'Credits'}
              onMenuClick={this.props.onCreditsSelect}
            />
          </ScrollView>
        </Animated.View>
      </Modal>
    );
  }

  onHighlightPress = () => this.closeMenu();

  openMenu = (onEnd: () => void = () => {}) => this.controlMenu(true, onEnd);

  closeMenu = (onEnd: () => void = () => {}) => this.controlMenu(false, onEnd);

  controlMenu = (open: boolean, onEnd: () => void) => {
    if (open) {
      this.setState(prevState => ({ ...prevState, modalVisible: true }));
    }
    Animated.parallel([
      Animated.timing(this.menuFade, {
        toValue: open ? 0.5 : 0,
        duration: 300,
      }),
      Animated.timing(this.menuX, {
        toValue: open ? 0 : -SIDE_PANE_WIDTH,
        duration: 300,
      }),
    ]).start(() => this.onMenuAnimationEnd(open, onEnd));
  };

  onMenuAnimationEnd(open: boolean, onEnd: () => void) {
    if (!open) {
      this.setState({ ...this.state, modalVisible: false }, onEnd);
    }
  }
}

export default SidePane;
