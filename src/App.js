import type { GlobalState } from './globalstate';
import GlobalContext from './globalstate';
import type { Product } from './product';
import NavigationContainer from './navigationcontainer';
import React from 'react';

type AppWithGlobalStateProps = {};

class App extends React.PureComponent<AppWithGlobalStateProps, GlobalState> {
  constructor() {
    super();

    this.state = {
      items: new Map(),
      addItem: this.addItem,
      removeItem: this.removeItem,
      clearItems: this.clearItems,
    };
  }

  async componentDidMount(): void {}

  addItem(item: Product) {
    this.setState((prevState, props) => {
      if (prevState.items.has(item.id)) {
        return prevState;
      }
      const newItems = new Map(prevState.items.entries());
      newItems.set(item.id, item);
      return {
        ...prevState,
        items: newItems,
      };
    });
  }

  removeItem(item: Product) {
    this.setState((prevState, props) => {
      if (prevState.items.has(item.id)) {
        return prevState;
      }
      const newItems = new Map(prevState.items.entries());
      newItems.delete(item.id);
      return {
        ...prevState,
        items: newItems,
      };
    });
  }

  clearItems() {
    this.setState((prevState, props) => {
      const newItems = new Map();
      return {
        ...prevState,
        items: newItems,
      };
    });
  }

  setItems(items: Product[]) {
    this.setState((prevState, props) => {
      const newItems = new Map();
      items.forEach(product => newItems.set(product.id, product));
      return {
        ...prevState,
        items: newItems,
      };
    });
  }

  render() {
    return (
      <GlobalContext.Provider value={this.state}>
        <NavigationContainer />
      </GlobalContext.Provider>
    );
  }
}
export default App;
