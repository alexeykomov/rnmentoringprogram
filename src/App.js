import type { GlobalState, LoadingState } from './globalstate';
import GlobalContext, { LoadingStates } from './globalstate';
import type { Product } from './product';
import NavigationContainer from './navigationcontainer';
import React from 'react';
import type { CartItemType } from './services/cartservice';
import Cart from './scene/cart/cart';

type AppWithGlobalStateProps = {};

if (__DEV__) {
  // This will make network calls visible in Chrome debugger
  global.XMLHttpRequest =
    global.originalXMLHttpRequest || global.XMLHttpRequest;
}

class App extends React.PureComponent<AppWithGlobalStateProps, GlobalState> {
  constructor() {
    super();

    const state: GlobalState = {
      quoteId: '',
      setQuoteId: this.setQuoteId,
      addProducts: this.addProducts,
      setItems: this.setItems,
      items: new Map(),
      products: new Map(),
      isProductsLoading: this.isProductsLoading,
      isItemsLoading: this.isItemsLoading,
      isItemsLoaded: this.isItemsLoaded,
      addItem: this.addItem,
      removeItem: this.removeItem,
      clearItems: this.clearItems,
      setItemsRequestState: this.setItemsRequestState,
      setProductsRequestState: this.setProductsRequestState,
      addProductToInProgress: this.addProductToInProgress,
      removeProductFromInProgress: this.removeProductFromInProgress,
      getCartProducts: this.getCartProducts,
      getProducts: this.getProducts,
      productsInProgress: new Set(),
    };

    this.state = state;
  }

  async componentDidMount(): void {}

  addItem = (product: Product) => {
    this.setState((prevState, props) => {
      if (prevState.items.has(product.sku)) {
        return prevState;
      }
      const newItems = new Map(prevState.items.entries());
      newItems.set(product.sku, product);
      return {
        ...prevState,
        items: newItems,
      };
    });
  };

  removeItem = (product: Product) => {
    this.setState((prevState, props) => {
      if (!prevState.items.has(product.sku)) {
        return prevState;
      }
      const newItems = new Map(prevState.items.entries());
      newItems.delete(product.sku);
      return {
        ...prevState,
        items: newItems,
      };
    });
  };

  clearItems = () => {
    this.setState((prevState, props) => {
      const newItems = new Map();
      return {
        ...prevState,
        items: newItems,
      };
    });
  };

  setItems = (items: CartItemType[]) => {
    this.setState((prevState, props) => {
      const newItems = new Map();
      items.forEach(item => newItems.set(item.sku, item));
      return {
        ...prevState,
        itemsState: LoadingStates.OK,
        items: newItems,
      };
    });
  };

  setItemsRequestState = (itemsState: LoadingState) => {
    this.setState((prevState, props) => {
      return {
        ...prevState,
        itemsState,
      };
    });
  };

  setProductsRequestState = (productsState: LoadingState) => {
    this.setState((prevState, props) => {
      return {
        ...prevState,
        productsState,
      };
    });
  };

  addProductToInProgress = (product: Product) => {
    this.setState((prevState, props) => {
      const prevIds = [...prevState.productsInProgress.values()];
      const newItemsInProgress = new Set(prevIds.concat([product.sku]));
      return {
        ...prevState,
        productsInProgress: newItemsInProgress,
      };
    });
  };

  removeProductFromInProgress = (product: Product) => {
    this.setState((prevState, props) => {
      const prevIds = [...prevState.productsInProgress.values()];
      const newItemsInProgress = new Set(
        prevIds.filter(sku => sku !== product.sku),
      );
      return {
        ...prevState,
        productsInProgress: newItemsInProgress,
      };
    });
  };

  getCartProducts = (): Product[] => {
    const products = [...this.state.items.keys()].map(sku =>
      this.state.products.get(sku),
    );
    return products;
  };

  getProducts = (): Product[] => {
    return [...this.state.products.values()];
  };

  addProducts = (aProducts: Product[]) => {
    this.setState(prevState => {
      const oldProducts = [...prevState.products.entries()];
      const newProducts = oldProducts.concat(
        aProducts.map(product => [product.sku, product]),
      );
      const products = new Map(newProducts);
      return {
        ...prevState,
        products,
      };
    });
  };

  isProductsLoading = () => {
    return this.state.productsState === LoadingStates.Loading;
  };

  isItemsLoading = () => {
    return this.state.itemsState === LoadingStates.Loading;
  };

  isItemsLoaded = () => {
    return this.state.itemsState === LoadingStates.OK;
  };

  setQuoteId = (quoteId: number) => {
    this.setState(prevState => ({ ...prevState, quoteId }));
  };

  render() {
    return (
      <GlobalContext.Provider value={this.state}>
        <NavigationContainer />
      </GlobalContext.Provider>
    );
  }
}
export default App;
