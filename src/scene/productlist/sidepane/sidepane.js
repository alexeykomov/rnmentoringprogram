/** @flow */

import {
  Animated,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  PanResponder,
} from 'react-native';
import Colors from '../../../colors';
import React from 'react';
import MenuItem from './menuitem/menuitem';
import { throttle } from '../../../lib/throttle';
import { noop } from '../../../lib/noop';
import type { GlobalState } from '../../../globalstate';
import GlobalContext from './../../../globalstate';

type SidePaneProps = {|
  onCreditsSelect: () => void,
  onLogoutSelect: () => void,
  onInfoSelect: () => void,
  onCartSelect: () => void,
|};

type SidePaneState = {|
  modalVisible: boolean,
|};

const SIDE_PANE_WIDTH = 270;
const MENU_CLOSING_VELOCITY = 30;

class SidePane extends React.PureComponent<SidePaneProps, SidePaneState> {
  menuX = new Animated.Value(-SIDE_PANE_WIDTH);

  menuFade = new Animated.Value(0);

  lastMoveX = 0;

  panResponder: PanResponder = null;

  constructor() {
    super();
    this.state = {
      modalVisible: false,
    };
    this.lastMoveX = 0;
    const storeLastMoveX = throttle(gestureState => {
      this.lastMoveX = gestureState.moveX;
    }, 100);

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        this.lastMoveX = gestureState.moveX;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx >= 0) {
          return;
        }
        storeLastMoveX(gestureState);
        return Animated.event([null, { dx: this.menuX }])(evt, gestureState);
      },
      onPanResponderTerminationRequest: (evt, gestureState) => {},
      onPanResponderRelease: (evt, gestureState) =>
        this.onPanResponderRelease(evt, gestureState),
      onPanResponderTerminate: (evt, gestureState) =>
        this.onPanResponderRelease(evt, gestureState),
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    });
  }

  onPanResponderRelease(evt: {||}, gestureState: GestureStateType) {
    if (Math.abs(gestureState.dx) <= 10 && Math.abs(gestureState.dy) <= 10) {
      return this.controlMenu(false, noop);
    }

    if (
      this.lastMoveX - gestureState.moveX > MENU_CLOSING_VELOCITY ||
      Math.abs(gestureState.dx) > SIDE_PANE_WIDTH / 3
    ) {
      return this.controlMenu(false, noop);
    }

    if (gestureState.vx <= 0) {
      Animated.decay(this.menuX, {
        velocity: gestureState.vx,
        deceleration: 0.8,
      }).start(() => this.controlMenu(true, noop));
    } else {
      this.controlMenu(true, noop);
    }
  }

  render() {
    return (
      <GlobalContext.Consumer>
        {(context: GlobalState) => (
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
                      inputRange: [-SIDE_PANE_WIDTH, 0],
                      outputRange: [-SIDE_PANE_WIDTH, 0],
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
                  menuItemName={'Cart'}
                  onMenuClick={this.props.onCartSelect}
                />
                <MenuItem
                  menuItemName={'Info'}
                  onMenuClick={this.props.onInfoSelect}
                />
                <MenuItem
                  menuItemName={'Credits'}
                  onMenuClick={this.props.onCreditsSelect}
                />
                <MenuItem
                  menuItemName={'Logout'}
                  onMenuClick={this.props.onLogoutSelect}
                />
              </ScrollView>
            </Animated.View>
          </Modal>
        )}
      </GlobalContext.Consumer>
    );
  }

  onHighlightPress = () => this.closeMenu();

  openMenu = (onEnd: MenuCallbackType = noop) => this.controlMenu(true, onEnd);

  closeMenu = (onEnd: MenuCallbackType = noop) =>
    this.controlMenu(false, onEnd);

  controlMenu = (open: boolean, onEnd: MenuCallbackType) => {
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

  onMenuAnimationEnd(open: boolean, onEnd: MenuCallbackType) {
    if (!open) {
      this.setState({ ...this.state, modalVisible: false }, onEnd);
    }
  }
}

type MenuCallbackType = (() => void) | (() => Promise<void>);

type GestureStateType = {|
  moveX: number,
  moveY: number,
  moveY: number,
  x0: number,
  y0: number,
  dx: number,
  dy: number,
  vx: number,
  vy: number,
  numberActiveTouches: number,
  _accountsForMovesUpTo: number,
|};

export default SidePane;
