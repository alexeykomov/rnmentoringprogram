/** @flow */

import React from 'react';
import { NetInfo } from 'react-native';
import type { NavigationScreenProp } from 'react-navigation';
import { Routes } from '../../routes';
import { noop } from '../../lib/noop';

type NetworkWatcherProps = {
  navigation: NavigationScreenProp<void>,
};

class NetworkWatcher extends React.PureComponent<NetworkWatcherProps> {
  render() {
    return null;
  }

  componentDidMount() {
    NetInfo.addEventListener('connectionChange', this.onConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.removeEventListener('connectionChange', this.onConnectivityChange);
  }

  onConnectivityChange = ({
    type,
    effectiveType,
  }: {
    type: string,
    effectiveType: string,
  }) => {
    const { navigation } = this.props;

    console.log('type: ', type);
    console.log('effectiveType: ', effectiveType);
    if (type === 'none') {
      navigation.navigate({
        routeName: Routes.Modal,
        params: {
          error: new Error(
            'Turn on cellular or WiFi connection to be able to use the application',
          ),
          retryAction: noop,
        },
      });
    }
  };
}

export default NetworkWatcher;
