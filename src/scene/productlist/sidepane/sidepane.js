import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PanResponder,
} from 'react-native';
import Colors from '../../../colors';
import React from 'react';
import MenuItem from './menuitem/menuitem';
import { throttle } from '../../../lib/throttle';

type SidePaneProps = {
  onCreditsSelect: () => void,
};

type SidePaneState = {
  modalVisible: boolean,
};

const SIDE_PANE_WIDTH = 270;

class SidePane extends React.PureComponent<SidePaneProps, SidePaneState> {
  menuX = new Animated.Value(-SIDE_PANE_WIDTH);

  menuFade = new Animated.Value(0);

  constructor() {
    super();
    this.state = {
      modalVisible: false,
    };
    this.lastMoveX = 0;
    const storeLastMoveX = throttle((gestureState) => {
      console.log('moveX: ', gestureState.moveX);
      this.lastMoveX = gestureState.moveX;
    }, 100);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      // onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      // onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        console.log('onPanResponderGrant: ', gestureState);
        this.lastMoveX = gestureState.moveX;
      },
      onPanResponderMove: (evt, gestureState) => {
        console.log('move: ', evt, ', gestureState: ', gestureState);
        console.log('dx: ', gestureState.dx);
        storeLastMoveX(gestureState);
        return Animated.event([null, { dx: this.menuX }])(evt, gestureState);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => {
        console.log('onPanResponderTerminationRequest');
      },
      onPanResponderRelease: (evt, gestureState) => {
        console.log('this.lastMoveX: ', this.lastMoveX);
        console.log('release: gestureState.moveX: ', gestureState.moveX);
        if (
          this.lastMoveX - gestureState.moveX > 20 ||
          Math.abs(gestureState.dx) > SIDE_PANE_WIDTH / 3
        ) {
          this.controlMenu(false, () => {});
        } else {
          this.controlMenu(true, () => {});
        }
      },
      onPanResponderTerminate: (evt, gestureState) => {},
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    });
  }

  render() {
    return (
      <Modal transparent={true} visible={this.state.modalVisible}>
        <Animated.View
          {...this.panResponder.panHandlers}
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
            transform: [
              {
                translateX: Animated.diffClamp(
                  this.menuX,
                  -SIDE_PANE_WIDTH,
                  0,
                ).interpolate({
                  inputRange: [
                    -SIDE_PANE_WIDTH,
                    -SIDE_PANE_WIDTH,
                    SIDE_PANE_WIDTH,
                    SIDE_PANE_WIDTH,
                  ],
                  outputRange: [
                    -SIDE_PANE_WIDTH,
                    -SIDE_PANE_WIDTH,
                    SIDE_PANE_WIDTH,
                    SIDE_PANE_WIDTH,
                  ],
                }),
              },
            ],
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
